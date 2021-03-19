import openDb from '../db';
import placeholders from 'named-placeholders';
const unamed = placeholders();

export interface Unity {
    id?: number;
    name: string;
    user_id: number;
}

//Get all unities and by userId
export const getAllUnities = async (userId: number): Promise<Unity[]> => {
    const db = await openDb();

    const unities: Unity[] = await db.all(
        ...unamed(`SELECT id, name, user_id FROM Unity WHERE (user_id IS NULL OR user_id=:userId)`, {
            userId: userId,
        }),
    );

    return unities;
};

//Get all base unities and by userId
export const addUnity = async (userId: number, unityName: string): Promise<Unity> => {
    const db = await openDb();

    const ret = await db.run(
        ...unamed(`INSERT INTO Unity (name, user_id) VALUES (:name, :userId)`, {
            userId: userId,
            name: unityName,
        }),
    );

    const unityId = ret.insertId;

    const unity = await db.get<Unity>(...unamed(`SELECT id, name, user_id FROM Unity WHERE id=:id`, { id: unityId }));

    return unity;
};

//Get all base unities and by userId
export const deleteUnity = async (userId: number, unityId: number): Promise<Unity[]> => {
    const db = await openDb();

    await db.run(
        ...unamed(`DELETE FROM Unity WHERE id=:id AND user_id=:userId`, {
            id: unityId,
            userId: userId,
        }),
    );

    const unities = getAllUnities(userId);
    return unities;
};
