// Dependencies
import express from 'express';
// Authentication
import { verifyToken, verifyUser } from '../../middlewares';
// Database
import { getAllIngredients, addIngredient, deleteIngredient } from '../../database/ingredient/ingredients';
import { getIngredientsByRecipes, numberPartsRecipe } from '../../database/ingredient_recipe/ingredientsRecipe';

// Router and mounting
const ingredients = express.Router();

//POST - /api/ingredients/getByRecipes - add an ingredients list from selected recipes with quantities updated by user's id;
ingredients.post('/getByRecipes', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    const requestGetIngredients = req.body;
    try {
        const ingredients = await getIngredientsByRecipes(userId, requestGetIngredients);

        // Method to update ingredient's quantity with the new 'number of parts' enterred
        const ingredientsList = ingredients.map((ingredient) => {
            const p = requestGetIngredients.find((elt: numberPartsRecipe) => elt.recipe_id === ingredient.recipe_id);
            const newQuantity = Math.ceil((ingredient.quantity / ingredient.recipe_number_parts) * p.number_parts);

            return {
                recipe_id: ingredient.recipe_id,
                ingredient: ingredient.ingredient,
                ingredient_id: ingredient.ingredient_id,
                quantity: newQuantity,
                unity: ingredient.unity,
                unity_id: ingredient.unity_id,
            };
        });
        res.status(200).json({ ingredientsList: ingredientsList });
    } catch (e) {
        console.error(e);
        return res.status(404).send('Unable to get ingredients for all recipes');
    }
});

//GET - /api/ingredients/getAll - get all ingredients by user's id;
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

//POST - /api/ingredients/add - add an ingredient into user database by user's id and ingredient's name;
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

// DELETE - '/api/ingredients/delete' - delete an ingredient from user database by user's id and ingredient's id
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

export default ingredients;
