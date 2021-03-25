import express from 'express';
import { verifyToken, verifyUser } from '../../app-config/firebase-config';
import {
    getAllIngredients,
    searchIngredients,
    addIngredient,
    deleteIngredient,
} from '../../database/ingredient/ingredients';
import { getIngredientsByRecipes } from '../../database/ingredient_recipe/ingredientsRecipe';

// Router and mounting
const ingredients = express.Router();

//GET - /api/ingredients/getByRecipes - get all ingredients for differents recipes by userId;
ingredients.post('/getByRecipes', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    const responseGetIngredients = req.body;
    try {
        const ingredients = await getIngredientsByRecipes(userId, responseGetIngredients);
        console.log('ingredients api:', ingredients);
        res.status(200).json({ ingredientsList: ingredients });
    } catch (e) {
        console.error(e);
        return res.status(404).send('Unable to get ingredients for all recipes');
    }
});

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

//POST - /api/ingredients/add - add an ingredient into user database;
ingredients.post('/add', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    const ingredientName = req.body.name;
    try {
        const ingredient = await addIngredient(userId, ingredientName);
        res.status(200).json({ ingredient: ingredient });
    } catch (e) {
        console.error(e);
        return res.status(404).send('Unable to add ingredient');
    }
});

// DELETE - '/api/ingredients/delete' - delete an ingredient from user database
ingredients.delete('/delete/:ingredientId', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    const ingredientId = Number(req.params.ingredientId);
    try {
        await deleteIngredient(userId, ingredientId);
        res.status(204).send();
    } catch (e) {
        console.error(e);
        res.status(404).send('Unable to delete the ingredient');
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
