import openDb from '../db';

export interface Unity {
    id?: number;
    name: string;
}

//Get all base ingredients and by userId
export const getAllUnities = async (userId: number): Promise<Unity[]> => {
    const db = await openDb();

    const unities: Unity[] = await db.all(`SELECT * FROM Unity WHERE (user_id IS NULL OR user_id=$userId)`, {
        $userId: userId,
    });

    return unities;
};

//Get all base ingredients and by userId
export const addUnity = async (userId: number, unityName: string): Promise<Unity> => {
    const db = await openDb();

    const ret = await db.run(`INSERT INTO Unity (name, user_id) VALUES ($name, $userId)`, {
        $userId: userId,
        $name: unityName,
    });

    const unityId = ret.lastID;

    const unity = await db.get(`SELECT * FROM Unity WHERE id=$id`, { $id: unityId });

    return unity;
};
