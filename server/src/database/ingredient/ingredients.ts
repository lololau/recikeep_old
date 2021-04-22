// Database
import openDb from '../db';
import placeholders from 'named-placeholders';

const unamed = placeholders();

export interface Ingredient {
    id: number;
    name: string;
    user_id?: number;
}

// SQL request - Get all ingredients from user connected by user's id
// Return : list of ingredients
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

// SQL request - Add an ingredient to user connected database by user's id and ingredient's name
// Return : ingredient
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

// SQL request - Delete an ingredient from user connected database by user's id and ingredient's id
// Return : list of ingredients without the deleted one
export const deleteIngredient = async (userId: number, ingredientId: number): Promise<Ingredient[]> => {
    const db = await openDb();

    await db.run(
        ...unamed(`DELETE FROM Ingredient WHERE id=:id AND user_id=:userId`, {
            id: ingredientId,
            userId: userId,
        }),
    );

    const ingredients = getAllIngredients(userId);
    return ingredients;
};

// SQL request - Get an ingredient by ingredient's id
// Return : ingredient
export const getIngredientById = async (ingredientId: number): Promise<Ingredient> => {
    const db = await openDb();

    const ingredient = await db.get<Ingredient>(
        ...unamed(`SELECT id, name, user_id FROM Ingredient WHERE id=:id`, { id: ingredientId }),
    );

    return ingredient;
};
