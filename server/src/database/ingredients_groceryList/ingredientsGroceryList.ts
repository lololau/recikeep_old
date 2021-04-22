// Database
import openDb from '../db';
import placeholders from 'named-placeholders';

const unamed = placeholders();

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

// SQL request - Add ingredients to a  grocery list by groceryList'id
// No return
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
                    recipeId: ingredient.recipe_id ? ingredient.recipe_id : null,
                },
            ),
        );
    });
};

type RequestCheckIngredient = {
    groceryListId: number;
    ingredientId: number;
    unityId: number;
    check: boolean;
};

// SQL request - Update checked property of a groceryList's ingredient by groceryList's id, ingredient's id and unity's id
// No return
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

// SQL request - Update ingredients of a grocery list by groceryList's id
// No return
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

// SQL request - Get ingredients from a grocery list by groceryList's id and user's id
// Return : list of ingredients
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
                ON (GroceryList_ingredient.recipe_id = Recipe.id OR GroceryList_ingredient.recipe_id IS NULL)
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

// SQL request - Get ingredients from a shared grocery list groceryList's shareUid
// Return : grocerylist's id
export const getGroceryListIdByShareUid = async (shareUid: string): Promise<number> => {
    const db = await openDb();

    const groceryList = await db.get<ResponseGetShareGroceryList>(
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

    return groceryList.groceryListId;
};
// SQL request - Delete groceryList's ingredrients from user connected when a grocery list is deleted by groceryList's id
// No return
export const deleteIngredientsGroceryList = async (groceryListId: number): Promise<void> => {
    const db = await openDb();

    await db.run(
        ...unamed(`DELETE FROM GroceryList_ingredient WHERE groceryList_id=:groceryList_id`, {
            groceryList_id: groceryListId,
        }),
    );
};
