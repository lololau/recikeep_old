import openDb from '../db';

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
            `INSERT INTO Recipe_ingredient (recipe_id, ingredient_id, unity_id, quantity) 
        VALUES ($recipeId, $ingredientId, $unityId, $quantity)`,
            {
                $recipeId: recipeId,
                $ingredientId: ingredient.ingredient_id,
                $unityId: ingredient.unity_id,
                $quantity: ingredient.quantity,
            },
        );
    });
};

export const updateIngredientsRecipe = async (recipeId: number, req: IngredientsRecipe[]): Promise<void> => {
    const db = await openDb();

    console.log('req', req);
    req.forEach(async (ingredient) => {
        console.log(ingredient);
        await db.run(`DELETE FROM Recipe_Ingredient WHERE recipe_id=$recipe_id`);
        /* await db.run(
            `UPDATE Recipe_ingredient 
            SET ingredient_id=$ingredientId, unity_id=$unityId, quantity=$quantity 
            WHERE recipe_id=$recipeId`,
            {
                $recipeId: recipeId,
                $ingredientId: ingredient.ingredient_id,
                $unityId: ingredient.unity_id,
                $quantity: ingredient.quantity,
            },
        ); */
        await addIngredientsRecipe(recipeId, req);
    });
};

// Get ingredients by recipeId and userId
export const getIngredientsRecipe = async (userId: number, recipeId: number): Promise<IngredientsRecipe[]> => {
    const db = await openDb();

    const ingredients = await db.all(
        `SELECT Ingredient.name as ingredient, Unity.name as unity, Recipe_ingredient.quantity as quantity, Recipe_ingredient.ingredient_id as ingredient_id, Recipe_ingredient.unity_id as unity_id
                FROM Recipe_ingredient 
                JOIN Ingredient
                ON Recipe_ingredient.ingredient_id = Ingredient.id
                JOIN Unity
                ON Recipe_ingredient.unity_id = Unity.id
                JOIN Recipe
                ON Recipe_ingredient.recipe_id = Recipe.id
                WHERE Recipe.id=$recipeId  AND Recipe.user_id=$userId`,
        {
            $recipeId: recipeId,
            $userId: userId,
        },
    );

    return ingredients;
};
