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
