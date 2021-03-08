import express from 'express';
import { verifyToken, verifyUser } from '../../app-config/firebase-config';
import { getAllUnities } from '../../database/unity/unities';

// Router and mounting
const unities = express.Router();

// GET - '/api/unities/getAll' - get all unities from initial state and by user
unities.get('/getAll', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    try {
        const unities = await getAllUnities(userId);
        res.status(200).json({ unities: unities });
    } catch (e) {
        console.error(e);
        res.status(404).send('Unable to get all unities');
    }
});

export default unities;
