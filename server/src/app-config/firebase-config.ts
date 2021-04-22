// Dependencies
import * as admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';
// Database
import { getUserIdByFirebaseID } from '../database/user/user';

admin.initializeApp();

type MiddlewareFn = (req: Request, res: Response, next: NextFunction) => void;

// Verify token - middleware
export const verifyToken: MiddlewareFn = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token || token === '') {
        return res.status(404).send('No token provided');
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        res.locals.decodedToken = decodedToken;
    } catch (e) {
        return res.status(401).send(`invalid token. Error: ${e}`);
    }
    next();
};

// Verify user - middleware
export const verifyUser: MiddlewareFn = async (req, res, next) => {
    if (!res.locals.decodedToken) {
        return res.status(401).send('No token provided');
    }
    try {
        const firebaseId = res.locals.decodedToken.uid;
        const userId = await getUserIdByFirebaseID(firebaseId);
        res.locals.userId = userId;
    } catch (e) {
        return res.status(401).send(`User not found error: ${e}`);
    }
    next();
};
