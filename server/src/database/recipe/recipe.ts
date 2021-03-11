import openDb from '../db';

export interface Recipe {
    id: number;
    name: string;
    presentation?: string;
    number_parts: number;
    time_presentation?: string;
    time_cooking?: string;
    user_id: number;
    recipe_photo_id?: number;
    recipe_description_id?: number;
}

export type RequestAddRecipe = {
    name: string;
    presentation?: string;
    number_parts: number;
    time_presentation?: string;
    time_cooking?: string;
    recipe_photo_id?: number;
    recipe_description_id?: number;
};

export const addRecipe = async (userId: number, req: RequestAddRecipe): Promise<Recipe> => {
    const db = await openDb();

    const ret = await db.run(
        `INSERT INTO Recipe (name, presentation, number_parts, time_presentation, time_cooking, user_id, recipe_photo_id, recipe_description_id) 
        VALUES ($name, $presentation, $number_parts, $time_presentation, $time_cooking, $user_id, $recipe_photo_id, $recipe_description_id)`,
        {
            $name: req.name,
            $presentation: req.presentation,
            $number_parts: req.number_parts,
            $time_presentation: req.time_presentation,
            $time_cooking: req.time_cooking,
            $user_id: userId,
            $recipe_photo_id: req.recipe_photo_id,
            $recipe_description_id: req.recipe_description_id,
        },
    );

    const recipeId = ret.lastID;

    const recipe = db.get(
        `SELECT id, name, presentation, number_parts, time_presentation, time_cooking, user_id, recipe_photo_id, recipe_description_id FROM Recipe WHERE id=$id`,
        { $id: recipeId },
    );

    return recipe;
};

export const getRecipesByUserId = async (userId: number): Promise<Recipe[]> => {
    const db = await openDb();

    const ret = await db.all(`SELECT * FROM Recipe WHERE user_id = $user_id`, {
        $user_id: userId,
    });

    const recipes = ret.map((recipe) => {
        return recipe.name;
    });

    return recipes;
};
