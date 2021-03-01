import openDb from './db';

type Recipe = {
    id: number;
    user_id: number;
    name: string;
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
