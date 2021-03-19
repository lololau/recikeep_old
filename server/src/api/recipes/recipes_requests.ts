import express from 'express';
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
import { verifyToken, verifyUser } from '../../app-config/firebase-config';

// Router and mounting
const recipes = express.Router();

//POST - /api/recipes/add - add a recipe to user database
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

//GET - /api/recipes/getAll - get all recipes by userID
recipes.get('/getAll', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    try {
        const recipes = await getAllRecipes(userId);
        res.status(200).json({ recipes: recipes });
    } catch (e) {
        return res.status(404).send('Unable to get recipes');
    }
});

//GET - /api/recipes/:id - get a recipe by userID and recipeId
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

//PUT - /api/recipes/update/:id - update a recipe by recipeId and userId
recipes.put('/update/:id', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    const recipeId = Number(req.params.id);
    console.log('recipeId:', recipeId);
    console.log('userId:', userId);
    const recipeRequest: RequestAddRecipe = {
        name: req.body.name,
        presentation: req.body.presentation,
        number_parts: req.body.number_parts,
        time_preparation: req.body.time_preparation,
        time_cooking: req.body.time_cooking,
    };
    console.log('recipeRequest:', recipeRequest);
    const ingredients: IngredientsRecipe[] = req.body.ingredients;

    console.log('ingredients:', ingredients);
    try {
        const recipe = await updateRecipe(userId, recipeId, recipeRequest);
        await updateIngredientsRecipe(recipeId, ingredients);
        res.status(200).json({ recipe: { ...recipe, ingredients } });
    } catch (e) {
        console.error(e);
        return res.status(404).send(`Unable to update recipe with id: ${recipeId}`);
    }
});

// DELETE - '/api/recipes/delete' - delete an ingredient from user database
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
