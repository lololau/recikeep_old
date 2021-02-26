import express from 'express';
// import sqlite3 from 'sqlite3';
import { verifyToken } from '../app-config/firebase-config';
import { findUserByFirebaseID } from '../database/user';
// const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// Router and mounting
const user = express.Router();

user.get('/getUser', verifyToken, async (req, res) => {
    const firebaseid = res.locals.decodedToken.uid;
    try {
        const user = await findUserByFirebaseID(firebaseid);
        res.status(200).json({ user: user });
    } catch (e) {
        return res.status(404).send('User not found');
    }
});

/* user.get('/', verifyToken, (req, res, next) => {
    db.get(
        `SELECT * FROM User WHERE firebaseId = $firebaseId`,
        {
            $firebaseId: res.locals.decodedToken.uid,
        },
        (err, user) => {

            if (err) {
                next(err);
            } else if (user) {
                res.locals.user = user;
            } else {
                res.status(404).send('User not created in database');
            }
        },
    );
}); */

export default user;
