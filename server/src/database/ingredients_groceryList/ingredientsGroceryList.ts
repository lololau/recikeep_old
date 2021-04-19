import openDb from '../db';
import placeholders from 'named-placeholders';
const unamed = placeholders();

// Add ingredients by recipe to the user database
export interface IngredientsGroceryList {
    recipe_id: number;
    ingredient_id: number;
    unity_id: number;
    quantity: number;
    checked: number;
    recipe_name: string;
    recipe_presentation: string;
}

export interface GroceryList {
    id: number;
    name: string;
    user_id: number;
}

/* export const addGroceryList = async (userId: number): Promise<GroceryList> => {
    const db = await openDb();

    const ret = await db.run(
        ...unamed(`INSERT INTO GroceryList (user_id) VALUES (:user_id)`, {
            user_id: userId,
        }),
    );

    const groceryListId = ret.insertId;

    const groceryList = db.get<GroceryList>(
        ...unamed(`SELECT id, user_id FROM GroceryList WHERE id=:id`, { id: groceryListId }),
    );

    return groceryList;
};
 */
export const addIngredientsGroceryList = async (
    groceryListId: number,
    req: IngredientsGroceryList[],
): Promise<void> => {
    const db = await openDb();

    req.forEach(async (ingredient) => {
        await db.run(
            ...unamed(
                `INSERT INTO GroceryList_ingredient (groceryList_id, ingredient_id, unity_id, quantity, checked, recipe_id) 
        VALUES (:groceryListId, :ingredientId, :unityId, :quantity, :checked, :recipeId)`,
                {
                    groceryListId: groceryListId,
                    ingredientId: ingredient.ingredient_id,
                    unityId: ingredient.unity_id,
                    quantity: ingredient.quantity,
                    checked: 0,
                    recipeId: ingredient.recipe_id,
                },
            ),
        );
    });
};

export const checkTrueIngredientGroceryList = async (
    groceryListId: number,
    ingredientId: number,
    unityId: number,
): Promise<void> => {
    const db = await openDb();

    await db.run(
        ...unamed(
            `UPDATE GroceryList_ingredient SET checked=:checked WHERE groceryList_id=:groceryListId AND ingredient_id=:ingredientId AND unity_id=:unityId`,
            {
                checked: 1,
                groceryListId: groceryListId,
                ingredientId: ingredientId,
                unityId: unityId,
            },
        ),
    );
};

export const checkFalseIngredientGroceryList = async (
    groceryListId: number,
    ingredientId: number,
    unityId: number,
): Promise<void> => {
    const db = await openDb();

    await db.run(
        ...unamed(
            `UPDATE GroceryList_ingredient SET checked=:checked WHERE groceryList_id=:groceryListId AND ingredient_id=:ingredientId AND unity_id=:unityId`,
            {
                checked: 0,
                groceryListId: groceryListId,
                ingredientId: ingredientId,
                unityId: unityId,
            },
        ),
    );
};

type RequestCheckIngredient = {
    groceryListId: number;
    ingredientId: number;
    unityId: number;
    check: boolean;
};

export const checkIngredient = async (req: RequestCheckIngredient): Promise<void> => {
    const db = await openDb();

    await db.run(
        ...unamed(
            `UPDATE GroceryList_ingredient SET checked=:checked WHERE groceryList_id=:groceryListId AND ingredient_id=:ingredientId AND unity_id=:unityId`,
            {
                checked: Number(req.check),
                groceryListId: req.groceryListId,
                ingredientId: req.ingredientId,
                unityId: req.unityId,
            },
        ),
    );
};

/* // Get one recipe by recipeId from user database
export const getGroceryListById = async (userId: number, groceryListId: number): Promise<GroceryList> => {
    const db = await openDb();

    const groceryList = await db.get<GroceryList>(
        ...unamed(`SELECT id FROM GroceryList WHERE user_id=:userId AND id=:id`, {
            userId: userId,
            id: groceryListId,
        }),
    );

    return groceryList;
};

// Get one recipe by recipeId from user database
export const getMostRecentGroceryList = async (userId: number): Promise<GroceryList> => {
    const db = await openDb();

    const groceryList = await db.get<GroceryList>(
        ...unamed(`SELECT id FROM GroceryList WHERE user_id=:userId ORDER BY date_creation DESC LIMIT 1`, {
            userId: userId,
        }),
    );

    return groceryList;
}; */

// Update ingredients by recipeId
export const updateIngredientsGroceryList = async (
    groceryListId: number,
    req: IngredientsGroceryList[],
): Promise<void> => {
    const db = await openDb();

    await db.run(
        ...unamed(`DELETE FROM GroceryList_ingredient WHERE groceryList_id=:groceryList_id`, {
            groceryList_id: groceryListId,
        }),
    );
    await addIngredientsGroceryList(groceryListId, req);
};

// Get ingredients by recipeId and userId
export const getIngredientsGroceryList = async (
    userId: number,
    groceryListId: number,
): Promise<IngredientsGroceryList[]> => {
    const db = await openDb();

    const ingredients = await db.all<IngredientsGroceryList>(
        ...unamed(
            `SELECT Ingredient.name as ingredient, Unity.name as unity, Recipe.name as recipe_name, Recipe.presentation as recipe_presentation, GroceryList_ingredient.quantity as quantity, GroceryList_ingredient.ingredient_id as ingredient_id, GroceryList_ingredient.unity_id as unity_id, GroceryList_ingredient.checked as checked, GroceryList_ingredient.recipe_id as recipe_id
                FROM GroceryList_ingredient 
                JOIN Ingredient
                ON GroceryList_ingredient.ingredient_id = Ingredient.id
                JOIN Unity
                ON GroceryList_ingredient.unity_id = Unity.id
                JOIN Recipe
                ON GroceryList_ingredient.recipe_id = Recipe.id
                JOIN GroceryList
                ON GroceryList_ingredient.groceryList_id = GroceryList.id
                WHERE GroceryList.id=:groceryListId  AND GroceryList.user_id=:userId`,
            {
                groceryListId: groceryListId,
                userId: userId,
            },
        ),
    );

    return ingredients;
};

type ResponseGetShareGroceryList = {
    groceryListId: number;
};

export const getGroceryListIdByShareUid = async (shareUid: string): Promise<number> => {
    const db = await openDb();

    const groceryListId = await db.get<ResponseGetShareGroceryList>(
        ...unamed(
            `SELECT GroceryList.id as groceryListId
                FROM GroceryList_ingredient
                JOIN GroceryList
                ON GroceryList_ingredient.groceryList_id = GroceryList.id
                WHERE GroceryList.share_uid=:shareUid LIMIT 1`,
            {
                shareUid: shareUid,
            },
        ),
    );

    return groceryListId.groceryListId;
};

// Delete ingredrients by groceryListId when a groceryList is deleted
export const deleteIngredientsGroceryList = async (groceryListId: number): Promise<void> => {
    const db = await openDb();

    await db.run(
        ...unamed(`DELETE FROM GroceryList_ingredient WHERE groceryList_id=:groceryList_id`, {
            groceryList_id: groceryListId,
        }),
    );
};
