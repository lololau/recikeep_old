// Dependencies
import express from 'express';
// Authentication
import { verifyToken } from '../../app-config/firebase-config';
// Database
import { getUserByFirebaseID, createUser, updateUser } from '../../database/user/user';

// Router and mounting
const user = express.Router();

// GET - /api/user/getUser - get a user by firebase's id
user.get('/getUser', verifyToken, async (req, res) => {
    const firebaseId = res.locals.decodedToken.uid;
    try {
        const user = await getUserByFirebaseID(firebaseId);
        res.status(200).json({ user: user });
    } catch (e) {
        return res.status(404).send('User not found');
    }
});

// POST - /api/user/createUser - create a user by firebase's id and username
user.post('/createUser', verifyToken, async (req, res) => {
    const firebaseId = res.locals.decodedToken.uid;
    const fullName = req.body.fullName;
    if (!fullName) {
        return res.status(400).send('Missing property for user');
    } else {
        try {
            const user = await createUser(firebaseId, fullName);
            res.status(200).json({ user: user });
        } catch (e) {
            console.error(e);
            return res.status(404).send('Unable to create user');
        }
    }
});

// PUT - /api/user/updateUser - update a user by firebase's id and new username
user.put('/updateUser', verifyToken, async (req, res) => {
    const firebaseId = res.locals.decodedToken.uid;
    const fullName = req.body.fullName;
    try {
        const user = await updateUser(firebaseId, fullName);
        res.status(200).json({ user: user });
    } catch (e) {
        console.error(e);
        return res.status(404).send('Unable to update user fullname');
    }
});

export default user;
