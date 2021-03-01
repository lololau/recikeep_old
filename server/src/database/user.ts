import openDb from './db';

type User = {
    id: number;
    firebase_id: string;
    first_name: string;
    last_name: string;
};

// Get all property from User by firebaseId
export const findUserByFirebaseID = async (fbid: string): Promise<User> => {
    const db = await openDb();
    const ret = await db.get(`SELECT * FROM User WHERE firebase_id = $firebaseId`, {
        $firebaseId: fbid,
    });

    const user = {
        id: ret.id,
        firebase_id: fbid,
        first_name: ret.first_name,
        last_name: ret.last_name,
    };

    return user;
};

// Create User by firebaseId, firstName and lastName.
export const createUser = async (fbid: string, firstN: string, lastN: string): Promise<User> => {
    const db = await openDb();

    await db.run(`INSERT INTO User (firebase_id, first_name, last_name) VALUES ($firebaseId, $firstName, $lastName)`, {
        $firebaseId: fbid,
        $firstName: firstN,
        $lastName: lastN,
    });

    const user = findUserByFirebaseID(fbid);
    return user;
};

// Get UserId by firebaseId
export const getUserIdByFirebaseID = async (fbid: string): Promise<number> => {
    const db = await openDb();

    const ret = await db.get(`SELECT id FROM User WHERE firebase_id = $firebaseId`, {
        $firebaseId: fbid,
    });

    return ret.id;
};
