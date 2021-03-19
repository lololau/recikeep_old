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

    const recipe = db.get<Recipe>(
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

    const recipe = await db.get<Recipe>(
        `SELECT id, name, presentation, number_parts, time_preparation, time_cooking, recipe_photo_id, recipe_description_id 
        FROM Recipe WHERE user_id=$userId AND id=$id`,
        {
            $userId: userId,
            $id: recipeId,
        },
    );

    return recipe;
};

export type RequestUpdateRecipe = {
    name?: string;
    presentation?: string;
    number_parts?: number;
    time_preparation?: string;
    time_cooking?: string;
    recipe_photo_id?: number;
    recipe_description_id?: number;
};

// Add a recipe to the user database
export const updateRecipe = async (userId: number, recipeId: number, req: RequestUpdateRecipe): Promise<Recipe> => {
    const db = await openDb();

    await db.run(
        `UPDATE Recipe 
        SET name=$name, presentation=$presentation, number_parts=$number_parts, time_preparation=$time_preparation, 
        time_cooking=$time_cooking, recipe_photo_id=$recipe_photo_id, recipe_description_id=$recipe_description_id
        WHERE id=$id AND user_id=$user_id`,
        {
            $name: req.name,
            $presentation: req.presentation,
            $number_parts: req.number_parts,
            $time_preparation: req.time_preparation,
            $time_cooking: req.time_cooking,
            $recipe_photo_id: req.recipe_photo_id,
            $recipe_description_id: req.recipe_description_id,
            $id: recipeId,
            $user_id: userId,
        },
    );

    const recipe = await db.get<Recipe>(
        `SELECT id, name, presentation, number_parts, time_preparation, time_cooking, user_id, recipe_photo_id, recipe_description_id FROM Recipe WHERE id=$id`,
        { $id: recipeId },
    );

    return recipe;
};
