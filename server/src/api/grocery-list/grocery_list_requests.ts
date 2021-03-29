import express from 'express';
import { verifyToken, verifyUser } from '../../app-config/firebase-config';
import {
    addGroceryList,
    addIngredientsGroceryList,
    IngredientsGroceryList,
    getGroceryList,
    getIngredientsGroceryList,
} from '../../database/ingredients_groceryList/ingredientsGroceryList';

// Router and mounting
const groceriesLists = express.Router();

//POST - /api/groceryList/add - add a recipe to user database
groceriesLists.post('/add', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    const ingredientsList: IngredientsGroceryList[] = req.body.ingredients;
    try {
        const groceryList = await addGroceryList(userId);

        const sortByIngredientId: { [key: string]: IngredientsGroceryList[] } = {};
        ingredientsList.forEach((elt) => {
            if (!sortByIngredientId[elt.ingredient_id]) {
                sortByIngredientId[elt.ingredient_id] = [];
            }
            sortByIngredientId[elt.ingredient_id].push(elt);
        });

        const finalIngredientsList: IngredientsGroceryList[] = [];

        Object.keys(sortByIngredientId).forEach((ingredientIdList) => {
            const sortByUnitId: { [key: string]: IngredientsGroceryList[] } = {};
            sortByIngredientId[ingredientIdList].forEach((ing) => {
                if (!sortByUnitId[ing.unity_id]) {
                    sortByUnitId[ing.unity_id] = [];
                }
                sortByUnitId[ing.unity_id].push(ing);
            });

            Object.keys(sortByUnitId).forEach((unitIdList) => {
                const newIngredientsList = sortByUnitId[unitIdList].reduce((a, b) => {
                    const quantity = a.quantity + b.quantity;
                    return { ...a, quantity: quantity };
                });
                finalIngredientsList.push(newIngredientsList);
            });
        });

        await addIngredientsGroceryList(groceryList.id, finalIngredientsList);
        res.status(201).json({ groceryList: groceryList });
    } catch (e) {
        console.error(e);
        return res.status(404).send('Unable to add grocery list');
    }
});

//GET - /api/groceryList/:id - get a recipe by userID and recipeId
groceriesLists.get('/:id', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    const groceryListId = Number(req.params.id);
    try {
        const groceryList = await getGroceryList(userId, groceryListId);
        const ingredients = await getIngredientsGroceryList(userId, groceryListId);
        res.status(200).json({ groceryList: { ...groceryList, ingredients } });
    } catch (e) {
        console.error(e);
        return res.status(404).send(`Unable to get the grocery list with id: ${groceryListId}`);
    }
});

export default groceriesLists;
