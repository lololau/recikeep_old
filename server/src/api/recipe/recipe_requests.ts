import express from 'express';
import { getRecipesByUserId } from '../../database/recipe';
import { verifyToken, verifyUser } from '../../app-config/firebase-config';

// Router and mounting
const recipe = express.Router();

//GET - /api/recipe/getAllRecipes - get all recipes by userID
recipe.get('/getAllRecipes', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    try {
        const recipes = await getRecipesByUserId(userId);
        res.status(200).json({ recipes: recipes });
    } catch (e) {
        return res.status(404).send('Recipes not found');
    }
});

export default recipe;
