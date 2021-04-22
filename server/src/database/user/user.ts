// Database
import openDb from '../db';
import placeholders from 'named-placeholders';

const unamed = placeholders();

type User = {
    id: number;
    firebase_id: string;
    full_name: string;
};

// SQL request - Get user by firebase's id
// Return : user
export const getUserByFirebaseID = async (fbid: string): Promise<User> => {
    const db = await openDb();
    const ret = await db.get<User>(
        ...unamed(`SELECT * FROM User WHERE firebase_id = :firebaseId`, {
            firebaseId: fbid,
        }),
    );

    const user = {
        id: ret.id,
        firebase_id: fbid,
        full_name: ret.full_name,
    };

    return user;
};

// SQL request - Create a user by firebase's id and username
// Return : user
export const createUser = async (fbid: string, fullN: string): Promise<User> => {
    const db = await openDb();

    await db.run(
        ...unamed(`INSERT INTO User (firebase_id, full_name) VALUES (:firebaseId, :fullName)`, {
            firebaseId: fbid,
            fullName: fullN,
        }),
    );

    const user = getUserByFirebaseID(fbid);
    return user;
};

// SQL request - Get user's id by firebase's id
// Return : user'id
export const getUserIdByFirebaseID = async (fbid: string): Promise<number> => {
    const db = await openDb();

    const ret = await db.get<User>(
        ...unamed(`SELECT id FROM User WHERE firebase_id = :firebaseId`, {
            firebaseId: fbid,
        }),
    );

    return ret.id;
};

// SQL request - Update a user by firebase's id and username
// Return : user
export const updateUser = async (fbid: string, fullN: string): Promise<User> => {
    const db = await openDb();

    const user_id = await getUserIdByFirebaseID(fbid);

    await db.run(
        ...unamed(`UPDATE User SET full_name=:fullName WHERE id = :userId`, {
            fullName: fullN,
            userId: user_id,
        }),
    );

    const user = getUserByFirebaseID(fbid);
    return user;
};
