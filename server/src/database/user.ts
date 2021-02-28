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

export const createUser = async (fbid: string, firstN: string, lastN: string): Promise<User> => {
    const db = await openDb();

    await db.run(`INSERT INTO User (firebaseId, firstName, lastName) VALUES ($firebaseId, $firstName, $lastName)`, {
        $firebaseId: fbid,
        $firstName: firstN,
        $lastName: lastN,
    });

    const user = findUserByFirebaseID(fbid);
    return user;
};
