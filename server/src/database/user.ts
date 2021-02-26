import openDb from './db';

type User = {
    id: number;
    firebaseId: string;
    firstName: string;
    lastName: string;
};

export const findUserByFirebaseID = async (fbid: string): Promise<User> => {
    const db = await openDb();
    const ret = await db.get(`SELECT * FROM User WHERE firebaseId = $firebaseId`, {
        $firebaseId: fbid,
    });

    const user = {
        id: ret.id,
        firebaseId: fbid,
        firstName: ret.firstName,
        lastName: ret.lastName,
    };

    return user;
};
