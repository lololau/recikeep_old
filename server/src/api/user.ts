import express from 'express';
import { verifyToken } from '../app-config/firebase-config';
import { findUserByFirebaseID, createUser } from '../database/user';

// Router and mounting
const user = express.Router();

// GET - /api/user/getUser - get a user by firebaseId
user.get('/getUser', verifyToken, async (req, res) => {
    const firebaseId = res.locals.decodedToken.uid;
    try {
        const user = await findUserByFirebaseID(firebaseId);
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
