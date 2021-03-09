import express from 'express';
import { verifyToken, verifyUser } from '../../app-config/firebase-config';
import { addUnity, deleteUnity, getAllUnities } from '../../database/unity/unities';

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

// POST - '/api/unities/add' - add an unity into user database
unities.post('/add', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    const unityName = req.body.name;
    try {
        const unity = await addUnity(userId, unityName);
        res.status(200).json({ unity: unity });
    } catch (e) {
        console.error(e);
        res.status(404).send('Unable to get all unities');
    }
});

// DELETE - '/api/unities/add' - add an unity into user database
unities.delete('/delete/:unityId', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    const unityId = Number(req.params.unityId);
    try {
        await deleteUnity(userId, unityId);
        res.status(204).send();
    } catch (e) {
        console.error(e);
        res.status(404).send('Unable to get all unities');
    }
});

export default unities;
