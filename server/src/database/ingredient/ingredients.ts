import openDb from '../db';

type Ingredient = {
    id: number;
    name: string;
};

export const getAllIngredients = async (): Promise<string[]> => {
    const db = await openDb();

    const ret: Ingredient[] = await db.all(`SELECT * FROM Ingredient`);

    const ingredients = ret.map((ingredient) => {
        return ingredient.name;
    });

    return ingredients;
};

export const getIngredientById = async (ingredientId: number): Promise<string> => {
    const db = await openDb();

    const ret = await db.get(`SELECT * FROM Ingredient WHERE id=$id`, { $id: ingredientId });

    const ingredient = ret.name;

    return ingredient;
};
