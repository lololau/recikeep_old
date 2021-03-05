import express from 'express';
import { verifyToken, verifyUser } from '../../app-config/firebase-config';
import { getAllIngredients } from '../../database/ingredient/ingredients';

// Router and mounting
const ingredients = express.Router();

//GET - /api/recipe/getAllIngredients - get all ingredients by userID with searchTerm;
ingredients.get('/search/:searchTerm', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    const searchTerm = req.params.searchTerm;
    try {
        const ingredients = await getAllIngredients(userId, searchTerm);
        res.status(200).json({ ingredients: ingredients });
    } catch (e) {
        console.error(e);
        return res.status(404).send('Unable to get the ingredients');
    }
});

export default ingredients;
