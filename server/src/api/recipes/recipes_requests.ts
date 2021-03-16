import express from 'express';
import { getAllRecipes, addRecipe, RequestAddRecipe } from '../../database/recipe/recipe';
import { addIngredientsRecipe, IngredientsRecipe } from '../../database/ingredient_recipe/ingredientsRecipe';
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
        time_presentation: req.body.time_presentation,
        time_cooking: req.body.time_cooking,
        recipe_photo_id: req.body.recipe_photo_id,
        recipe_description_id: req.body.recipe_description_id,
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

export default recipes;
