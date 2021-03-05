import openDb from '../db';

// Get all ingredients by userId and ingredients base when userId is NULL
export const getAllIngredients = async (userId: number, searchTerm: string): Promise<string[]> => {
    const db = await openDb();

    const ingredients: string[] = await db.all(
        `SELECT name FROM Ingredient WHERE name LIKE '%${searchTerm}%' AND (user_id IS NULL OR user_id=$userId)`,
        {
            $userId: userId,
        },
    );

    return ingredients;
};

// Get an ingredient by IngredientId
export const getIngredientById = async (ingredientId: number): Promise<string> => {
    const db = await openDb();

    const ret = await db.get(`SELECT * FROM Ingredient WHERE id=$id`, { $id: ingredientId });

    const ingredient = ret.name;

    return ingredient;
};
