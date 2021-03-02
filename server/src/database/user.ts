import openDb from './db';

type User = {
    id: number;
    firebase_id: string;
    full_name: string;
};

// Get all property from User by firebaseId
export const getUserByFirebaseID = async (fbid: string): Promise<User> => {
    const db = await openDb();
    const ret = await db.get(`SELECT * FROM User WHERE firebase_id = $firebaseId`, {
        $firebaseId: fbid,
    });

    const user = {
        id: ret.id,
        firebase_id: fbid,
        full_name: ret.full_name,
    };

    return user;
};

// Create User by firebaseId, firstName and lastName.
export const createUser = async (fbid: string, fullN: string): Promise<User> => {
    const db = await openDb();

    await db.run(`INSERT INTO User (firebase_id, full_name) VALUES ($firebaseId, $fullName)`, {
        $firebaseId: fbid,
        $fullName: fullN,
    });

    const user = getUserByFirebaseID(fbid);
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

// Create User by firebaseId, firstName and lastName.
export const updateUser = async (fbid: string, fullN: string): Promise<User> => {
    const db = await openDb();

    const user_id = await getUserIdByFirebaseID(fbid);

    await db.run(`UPDATE User SET full_name=$fullName WHERE id = $userId`, {
        $fullName: fullN,
        $userId: user_id,
    });

    const user = getUserByFirebaseID(fbid);
    return user;
};
