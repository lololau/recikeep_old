import openDb from '../db';
import placeholders from 'named-placeholders';
import { nanoid } from 'nanoid';
const unamed = placeholders();

export interface GroceryList {
    id: number;
    name: string;
    user_id: number;
    share_uid: string;
}

export type RequestAddGroceryList = {
    name: string;
};

// Add a grocery list to the user database
export const addGroceryList = async (userId: number, req: RequestAddGroceryList): Promise<GroceryList> => {
    const db = await openDb();

    const ret = await db.run(
        ...unamed(`INSERT INTO GroceryList (user_id, name, share_uid) VALUES (:user_id, :name, :share_uid)`, {
            user_id: userId,
            name: req.name,
            share_uid: nanoid(10),
        }),
    );

    const groceryListId = ret.insertId;

    const groceryList = db.get<GroceryList>(
        ...unamed(`SELECT id, name, user_id FROM GroceryList WHERE id=:id`, {
            id: groceryListId,
        }),
    );

    return groceryList;
};

// Get share grocery list by share_uid
export const getShareGroceryList = async (shareUid: string): Promise<GroceryList> => {
    const db = await openDb();

    const groceryList = await db.get<GroceryList>(
        ...unamed(
            `SELECT id, name, user_id 
            FROM GroceryList WHERE share_uid=:share_uid`,
            {
                share_uid: shareUid,
            },
        ),
    );

    return groceryList;
};

// Get all recipes from user database
export const getAllGroceriesList = async (userId: number): Promise<GroceryList[]> => {
    const db = await openDb();

    const groceries: GroceryList[] = await db.all<GroceryList>(
        ...unamed(`SELECT name, id FROM GroceryList WHERE user_id=:userId ORDER BY date_creation DESC`, {
            userId: userId,
        }),
    );

    return groceries;
};

// Get one grocery list by groceryListId from user database
export const getGroceryListInformations = async (userId: number, groceryListId: number): Promise<GroceryList> => {
    const db = await openDb();

    const groceryList = await db.get<GroceryList>(
        ...unamed(
            `SELECT id, name, share_uid
            FROM GroceryList WHERE user_id=:userId AND id=:id`,
            {
                userId: userId,
                id: groceryListId,
            },
        ),
    );

    return groceryList;
};

// Delete a grocery list to the user database
export const deleteGroceryList = async (userId: number, groceryListId: number): Promise<GroceryList[]> => {
    const db = await openDb();

    await db.run(
        ...unamed(`DELETE FROM GroceryList WHERE id=:id AND user_id=:userId`, {
            id: groceryListId,
            userId: userId,
        }),
    );

    const groceries = getAllGroceriesList(userId);
    return groceries;
};
