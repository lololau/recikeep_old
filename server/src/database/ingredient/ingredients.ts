import openDb from '../db';
import placeholders from 'named-placeholders';
const unamed = placeholders();

export interface Ingredient {
    id?: number;
    name: string;
    user_id?: number;
}

//Get all base ingredients and by userId
export const getAllIngredients = async (userId: number): Promise<Ingredient[]> => {
    const db = await openDb();

    const ingredients: Ingredient[] = await db.all<Ingredient>(
        ...unamed(
            `SELECT id, name, user_id FROM Ingredient WHERE language=:language AND (user_id IS NULL OR user_id=:userId)`,
            {
                userId: userId,
                language: 'fr',
            },
        ),
    );
    return ingredients;
};

//Add an ingredient into user database;
export const addIngredient = async (userId: number, ingredientName: string): Promise<Ingredient> => {
    const db = await openDb();

    const result = await db.run(
        ...unamed(`INSERT INTO Ingredient (user_id, name, language) VALUES (:userId, :name, :language)`, {
            userId: userId,
            name: ingredientName,
            language: 'fr',
        }),
    );

    const ingredientId = result.insertId;

    const ingredient = await db.get<Ingredient>(
        ...unamed(`SELECT id, name, user_id FROM Ingredient WHERE id=:id`, {
            id: ingredientId,
        }),
    );

    return ingredient;
};

//Delete an ingredient from user database
export const deleteIngredient = async (userId: number, ingredientId: number): Promise<Ingredient[]> => {
    const db = await openDb();

    await db.run(
        ...unamed(`DELETE FROM Ingredient WHERE id=:id AND user_id=:userId`, {
            id: ingredientId,
            userId: userId,
        }),
    );

    const unities = getAllIngredients(userId);
    return unities;
};

// Search ingredients by searchTerm
export const searchIngredients = async (userId: number, searchTerm: string): Promise<string[]> => {
    const db = await openDb();

    const ingredients: string[] = await db.all<string>(
        ...unamed(
            `SELECT name FROM Ingredient WHERE name LIKE '%${searchTerm}%' AND (user_id IS NULL OR user_id=:userId)`,
            {
                userId: userId,
            },
        ),
    );

    return ingredients;
};

// Get an ingredient by IngredientId
export const getIngredientById = async (ingredientId: number): Promise<Ingredient> => {
    const db = await openDb();

    const ingredient = await db.get<Ingredient>(
        ...unamed(`SELECT id, name, user_id FROM Ingredient WHERE id=:id`, { id: ingredientId }),
    );

    return ingredient;
};
