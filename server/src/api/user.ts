import express from 'express';
// import sqlite3 from 'sqlite3';
import { verifyToken } from '../app-config/firebase-config';
import { findUserByFirebaseID, createUser } from '../database/user';
// const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// Router and mounting
const user = express.Router();

// GET - /api/user/getUser - get a user by firebaseId
user.get('/getUser', verifyToken, async (req, res) => {
    const firebaseid = res.locals.decodedToken.uid;
    try {
        const user = await findUserByFirebaseID(firebaseid);
        res.status(200).json({ user: user });
    } catch (e) {
        return res.status(404).send('User not found');
    }
});

// POST - /api/user/createUser - create a user and select it
user.post('/createUser', verifyToken, async (req, res) => {
    const firebaseId = res.locals.decodedToken.uid;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    if (!firstName || !lastName) {
        return res.status(400).send('Missing property for user');
    } else {
        try {
            const user = await createUser(firebaseId, firstName, lastName);
            res.status(200).json({ user: user });
        } catch (e) {
            console.error(e);
            return res.status(404).send('Unable to create user');
        }
    }
});

export default user;
