import openDb from '../db';

export interface Recipe {
    id: number;
    name: string;
    presentation?: string;
    number_parts: number;
    time_preparation?: string;
    time_cooking?: string;
    user_id: number;
    recipe_photo_id?: number;
    recipe_description_id?: number;
}

export type RequestAddRecipe = {
    name: string;
    presentation?: string;
    number_parts: number;
    time_preparation?: string;
    time_cooking?: string;
    recipe_photo_id?: number;
    recipe_description_id?: number;
};

// Add a recipe to the user database
export const addRecipe = async (userId: number, req: RequestAddRecipe): Promise<Recipe> => {
    const db = await openDb();

    const ret = await db.run(
        `INSERT INTO Recipe (name, presentation, number_parts, time_preparation, time_cooking, user_id, recipe_photo_id, recipe_description_id) 
        VALUES ($name, $presentation, $number_parts, $time_preparation, $time_cooking, $user_id, $recipe_photo_id, $recipe_description_id)`,
        {
            $name: req.name,
            $presentation: req.presentation,
            $number_parts: req.number_parts,
            $time_preparation: req.time_preparation,
            $time_cooking: req.time_cooking,
            $user_id: userId,
            $recipe_photo_id: req.recipe_photo_id,
            $recipe_description_id: req.recipe_description_id,
        },
    );

    const recipeId = ret.lastID;

    const recipe = db.get(
        `SELECT id, name, presentation, number_parts, time_preparation, time_cooking, user_id, recipe_photo_id, recipe_description_id FROM Recipe WHERE id=$id`,
        { $id: recipeId },
    );

    return recipe;
};

// Get all recipes from user database
export const getAllRecipes = async (userId: number): Promise<Recipe[]> => {
    const db = await openDb();

    const recipes: Recipe[] = await db.all(`SELECT name, id FROM Recipe WHERE user_id=$userId`, {
        $userId: userId,
    });

    return recipes;
};

// Get one recipe by recipeId from user database
export const getRecipeInformations = async (userId: number, recipeId: number): Promise<Recipe> => {
    const db = await openDb();

    const recipe = await db.get(
        `SELECT name, presentation, number_parts, time_preparation, time_cooking, recipe_photo_id, recipe_description_id 
        FROM Recipe WHERE user_id=$userId AND id=$id`,
        {
            $userId: userId,
            $id: recipeId,
        },
    );

    return recipe;
};

//Get ingredients by recipeId and userId
`
SELECT Ingredient.name as ingredient, Unity.name as unity, Recipe_ingredient.quantity as quantity
        FROM Recipe_ingredient 
		JOIN Ingredient
		ON Recipe_ingredient.ingredient_id = Ingredient.id
		JOIN Unity
		ON Recipe_ingredient.unity_id = Unity.id
		JOIN Recipe
		ON Recipe_ingredient.recipe_id = Recipe.id
		WHERE Recipe.id=$recipeId  AND Recipe.user_id=$userId
        `;
