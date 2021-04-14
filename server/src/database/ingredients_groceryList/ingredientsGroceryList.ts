import openDb from '../db';
import placeholders from 'named-placeholders';
const unamed = placeholders();

// Add ingredients by recipe to the user database
export interface IngredientsGroceryList {
    ingredient_id: number;
    unity_id: number;
    quantity: number;
    checked: number;
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
                `INSERT INTO GroceryList_ingredient (groceryList_id, ingredient_id, unity_id, quantity, checked) 
        VALUES (:groceryListId, :ingredientId, :unityId, :quantity, :checked)`,
                {
                    groceryListId: groceryListId,
                    ingredientId: ingredient.ingredient_id,
                    unityId: ingredient.unity_id,
                    quantity: ingredient.quantity,
                    checked: 0,
                },
            ),
        );
    });
};

export const checkTrueIngredientGroceryList = async (groceryListId: number, ingredientId: number): Promise<void> => {
    const db = await openDb();

    await db.run(
        ...unamed(
            `UPDATE GroceryList_ingredient SET checked=:checked WHERE groceryList_id=:groceryListId AND ingredient_id=:ingredientId`,
            {
                checked: 1,
                groceryListId: groceryListId,
                ingredientId: ingredientId,
            },
        ),
    );
};

export const checkFalseIngredientGroceryList = async (groceryListId: number, ingredientId: number): Promise<void> => {
    const db = await openDb();

    await db.run(
        ...unamed(
            `UPDATE GroceryList_ingredient SET checked=:checked WHERE groceryList_id=:groceryListId AND ingredient_id=:ingredientId`,
            {
                checked: 0,
                groceryListId: groceryListId,
                ingredientId: ingredientId,
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
            `SELECT Ingredient.name as ingredient, Unity.name as unity, GroceryList_ingredient.quantity as quantity, GroceryList_ingredient.ingredient_id as ingredient_id, GroceryList_ingredient.unity_id as unity_id, GroceryList_ingredient.checked as checked
                FROM GroceryList_ingredient 
                JOIN Ingredient
                ON GroceryList_ingredient.ingredient_id = Ingredient.id
                JOIN Unity
                ON GroceryList_ingredient.unity_id = Unity.id
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

// Delete ingredrients by groceryListId when a groceryList is deleted
export const deleteIngredientsGroceryList = async (groceryListId: number): Promise<void> => {
    const db = await openDb();

    await db.run(
        ...unamed(`DELETE FROM GroceryList_ingredient WHERE groceryList_id=:groceryList_id`, {
            groceryList_id: groceryListId,
        }),
    );
};
