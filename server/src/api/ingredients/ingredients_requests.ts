import express from 'express';
import { verifyToken, verifyUser } from '../../app-config/firebase-config';
import { getAllIngredients } from '../../database/ingredient/ingredients';

// Router and mounting
const ingredients = express.Router();

//GET - /api/recipe/getAllRecipes - get all recipes by userID
ingredients.get('/getAllRecipes', verifyToken, verifyUser, async (req, res) => {
    //const userId = res.locals.userId;
    try {
        const recipes = await getAllIngredients();
        res.status(200).json({ recipes: recipes });
    } catch (e) {
        return res.status(404).send('Recipes not found');
    }
});

export default ingredients;
