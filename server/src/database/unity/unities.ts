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
