import * as admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';

admin.initializeApp();

type MiddlewareFn = (req: Request, res: Response, next: NextFunction) => void;

//Verify token
export const verifyToken: MiddlewareFn = async (req, res, next) => {
    console.log(req.body);
    const token = req.headers.authorization;
    if (!token || token === '') {
        return res.status(404).send('No token provided');
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        res.locals.decodedToken = decodedToken;
    } catch (e) {
        return res.status(401).send(`invalid token: ${e}`);
    }
    next();
};
