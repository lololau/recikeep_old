import openDb from '../db';
import placeholders from 'named-placeholders';
const unamed = placeholders();

// Add ingredients by recipe to the user database
export interface IngredientsRecipe {
    ingredient_id: number;
    unity_id: number;
    quantity: number;
}

export const addIngredientsRecipe = async (recipeId: number, req: IngredientsRecipe[]): Promise<void> => {
    const db = await openDb();

    req.forEach(async (ingredient) => {
        await db.run(
            ...unamed(
                `INSERT INTO Recipe_ingredient (recipe_id, ingredient_id, unity_id, quantity) 
        VALUES (:recipeId, :ingredientId, :unityId, :quantity)`,
                {
                    recipeId: recipeId,
                    ingredientId: ingredient.ingredient_id,
                    unityId: ingredient.unity_id,
                    quantity: ingredient.quantity,
                },
            ),
        );
    });
};

// Update ingredients by recipeId
export const updateIngredientsRecipe = async (recipeId: number, req: IngredientsRecipe[]): Promise<void> => {
    const db = await openDb();

    await db.run(...unamed(`DELETE FROM Recipe_ingredient WHERE recipe_id=:recipe_id`, { recipe_id: recipeId }));
    await addIngredientsRecipe(recipeId, req);
};

// Get ingredients by recipeId and userId
export const getIngredientsRecipe = async (userId: number, recipeId: number): Promise<IngredientsRecipe[]> => {
    const db = await openDb();

    const ingredients = await db.all<IngredientsRecipe>(
        ...unamed(
            `SELECT Ingredient.name as ingredient, Unity.name as unity, Recipe_ingredient.quantity as quantity, Recipe_ingredient.ingredient_id as ingredient_id, Recipe_ingredient.unity_id as unity_id
                FROM Recipe_ingredient 
                JOIN Ingredient
                ON Recipe_ingredient.ingredient_id = Ingredient.id
                JOIN Unity
                ON Recipe_ingredient.unity_id = Unity.id
                JOIN Recipe
                ON Recipe_ingredient.recipe_id = Recipe.id
                WHERE Recipe.id=:recipeId  AND Recipe.user_id=:userId`,
            {
                recipeId: recipeId,
                userId: userId,
            },
        ),
    );

    return ingredients;
};

// Delete ingredrients by recipeId when a recipe is deleted
export const deleteIngredientsRecipe = async (recipeId: number): Promise<void> => {
    const db = await openDb();

    await db.run(...unamed(`DELETE FROM Recipe_ingredient WHERE recipe_id=:recipe_id`, { recipe_id: recipeId }));
};

export type numberPartsRecipe = {
    recipe_id: number;
    number_parts: number;
};

export type ResponseGetIngredientsByRecipes = {
    ingredient: string;
    ingredient_id: number;
    unity: string;
    unity_id: number;
    quantity: number;
    recipe_id: number;
    recipe_number_parts: number;
};

// Get all ingredients for differents recipeId
export const getIngredientsByRecipes = async (
    userId: number,
    numberPartsByRecipe: numberPartsRecipe[],
): Promise<ResponseGetIngredientsByRecipes[]> => {
    let query = `SELECT Ingredient.name as ingredient, Unity.name as unity, Recipe_ingredient.quantity as quantity, 
    Recipe_ingredient.ingredient_id as ingredient_id, Recipe_ingredient.unity_id as unity_id,
    Recipe.id as recipe_id, Recipe.number_parts as recipe_number_parts
        FROM Recipe_ingredient 
        JOIN Ingredient
        ON Recipe_ingredient.ingredient_id = Ingredient.id
        JOIN Unity
        ON Recipe_ingredient.unity_id = Unity.id
        JOIN Recipe
        ON Recipe_ingredient.recipe_id = Recipe.id`;

    const cond = numberPartsByRecipe.map((e) => `Recipe.id=${e.recipe_id}`).join(' OR ');

    query += ` WHERE (${cond}) AND Recipe.user_id=${userId}`;

    const db = await openDb();

    const ingredientsList: ResponseGetIngredientsByRecipes[] = await db.all(query);

    return ingredientsList;
};
