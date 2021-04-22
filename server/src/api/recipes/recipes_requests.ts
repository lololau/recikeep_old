// Dependencies
import express from 'express';
// Authentication
import { verifyToken, verifyUser } from '../../app-config/firebase-config';
// Database
import {
    getAllRecipes,
    getRecipeInformations,
    addRecipe,
    RequestAddRecipe,
    updateRecipe,
    deleteRecipe,
} from '../../database/recipe/recipe';
import {
    addIngredientsRecipe,
    getIngredientsRecipe,
    updateIngredientsRecipe,
    deleteIngredientsRecipe,
    IngredientsRecipe,
} from '../../database/ingredient_recipe/ingredientsRecipe';

// Router and mounting
const recipes = express.Router();

//POST - /api/recipes/add - add a recipe to user database by user's id
recipes.post('/add', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    const recipeRequest: RequestAddRecipe = {
        name: req.body.name,
        presentation: req.body.presentation,
        number_parts: req.body.number_parts,
        time_preparation: req.body.time_preparation,
        time_cooking: req.body.time_cooking,
    };
    const ingredients: IngredientsRecipe[] = req.body.ingredients;
    try {
        const recipe = await addRecipe(userId, recipeRequest);
        await addIngredientsRecipe(recipe.id, ingredients);
        res.status(201).json({ recipe: recipe });
    } catch (e) {
        console.error(e);
        return res.status(404).send('Unable to add recipe');
    }
});

//GET - /api/recipes/getAll - get all recipes by user's id
recipes.get('/getAll', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    try {
        const recipes = await getAllRecipes(userId);
        res.status(200).json({ recipes: recipes });
    } catch (e) {
        return res.status(404).send('Unable to get recipes');
    }
});

//GET - /api/recipes/:id - get a recipe by user's id and recipe's id
recipes.get('/:id', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    const recipeId = Number(req.params.id);
    try {
        const recipe = await getRecipeInformations(userId, recipeId);
        const ingredients = await getIngredientsRecipe(userId, recipeId);
        res.status(200).json({ recipe: { ...recipe, ingredients } });
    } catch (e) {
        return res.status(404).send(`Unable to get recipe with id: ${recipeId}`);
    }
});

//PUT - /api/recipes/update/:id - update a recipe by recipe's id and user's id
recipes.put('/update/:id', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    const recipeId = Number(req.params.id);

    const recipeRequest: RequestAddRecipe = {
        name: req.body.name,
        presentation: req.body.presentation,
        number_parts: req.body.number_parts,
        time_preparation: req.body.time_preparation,
        time_cooking: req.body.time_cooking,
    };

    const ingredients: IngredientsRecipe[] = req.body.ingredients;

    try {
        const recipe = await updateRecipe(userId, recipeId, recipeRequest);
        await updateIngredientsRecipe(recipeId, ingredients);

        res.status(200).json({ recipe: { ...recipe, ingredients } });
    } catch (e) {
        console.error(e);
        return res.status(404).send(`Unable to update recipe with id: ${recipeId}`);
    }
});

// DELETE - '/api/recipes/delete/:id' - delete a recipe from user database by user's id and recipe's id
recipes.delete('/delete/:recipeId', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    const recipeId = Number(req.params.recipeId);
    try {
        await deleteIngredientsRecipe(recipeId);
        await deleteRecipe(userId, recipeId);
        res.status(204).send();
    } catch (e) {
        console.error(e);
        res.status(404).send('Unable to delete the recipe');
    }
});

export default recipes;
