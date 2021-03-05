import express from 'express';
import { verifyToken, verifyUser } from '../../app-config/firebase-config';
import { getAllIngredients, searchIngredients } from '../../database/ingredient/ingredients';

// Router and mounting
const ingredients = express.Router();

//GET - /api/ingredients/getAll - get all base ingredients and ingredients by userId;
ingredients.get('/getAll', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    try {
        const ingredients = await getAllIngredients(userId);
        res.status(200).json({ ingredients: ingredients });
    } catch (e) {
        console.error(e);
        return res.status(404).send('Unable to get the ingredients');
    }
});

//GET - /api/ingredients/search - search ingredients with searchTerm;
ingredients.get('/search/:searchTerm', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    const searchTerm = req.params.searchTerm;
    try {
        const ingredients = await searchIngredients(userId, searchTerm);
        res.status(200).json({ ingredients: ingredients });
    } catch (e) {
        console.error(e);
        return res.status(404).send('Unable to get the ingredients');
    }
});

export default ingredients;
