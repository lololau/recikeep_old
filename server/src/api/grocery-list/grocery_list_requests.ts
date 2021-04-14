import express from 'express';
import { verifyToken, verifyUser } from '../../app-config/firebase-config';
import {
    addIngredientsGroceryList,
    IngredientsGroceryList,
    getIngredientsGroceryList,
    deleteIngredientsGroceryList,
    checkTrueIngredientGroceryList,
    checkFalseIngredientGroceryList,
} from '../../database/ingredients_groceryList/ingredientsGroceryList';
import {
    addGroceryList,
    getGroceryListInformations,
    getAllGroceriesList,
    RequestAddGroceryList,
    deleteGroceryList,
} from '../../database/groceries/groceries';

// Router and mounting
const groceriesLists = express.Router();

//POST - /api/groceryList/add - add a groceryList to user database
groceriesLists.post('/add', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    const ingredientsList: IngredientsGroceryList[] = req.body.ingredients;
    const groceryListRequest: RequestAddGroceryList = {
        name: req.body.name,
    };
    try {
        const groceryList = await addGroceryList(userId, groceryListRequest);

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

//GET - /api/groceryList/getAll - get all groceries lists by userID
groceriesLists.get('/getAll', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    try {
        const groceries = await getAllGroceriesList(userId);
        res.status(200).json({ groceriesLists: groceries });
    } catch (e) {
        console.error(e);
        return res.status(404).send(`Unable to get all the groceries list`);
    }
});

//GET - /api/groceryList/:id - get a groceryList by userID and groceryListId
groceriesLists.get('/:id', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    const groceryListId = Number(req.params.id);
    try {
        const groceryList = await getGroceryListInformations(userId, groceryListId);
        const ingredients = await getIngredientsGroceryList(userId, groceryListId);
        res.status(200).json({ groceryList: { ...groceryList, ingredients } });
    } catch (e) {
        console.error(e);
        return res.status(404).send(`Unable to get the grocery list with id: ${groceryListId}`);
    }
});

// DELETE - '/api/groceryList/delete' - delete a grocery list from user database
groceriesLists.delete('/delete/:groceryListId', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    const groceryListId = Number(req.params.groceryListId);
    try {
        await deleteIngredientsGroceryList(groceryListId);
        await deleteGroceryList(userId, groceryListId);
        res.status(204).send();
    } catch (e) {
        console.error(e);
        res.status(404).send('Unable to delete the grocery list');
    }
});

// PUT - 'api/groceriesList/updateTrue' - update ingredient.checked to 1 by groceryListId and ingredientId
groceriesLists.put('/updateTrue', verifyToken, verifyUser, async (req, res) => {
    const groceryListId = req.body.groceryListId;
    const ingredientId = req.body.ingredient.ingredient_id;
    try {
        await checkTrueIngredientGroceryList(groceryListId, ingredientId);
        res.status(200).send();
    } catch (e) {
        console.error(e);
        res.status(404).send(
            `Unable to check ingredient with id: ${ingredientId} in groceryList with id: ${groceryListId}`,
        );
    }
});

// PUT - 'api/groceriesList/updateTrue' - update ingredient.checked to 0 by groceryListId and ingredientId
groceriesLists.put('/updateFalse', verifyToken, verifyUser, async (req, res) => {
    const groceryListId = req.body.groceryListId;
    const ingredientId = req.body.ingredientId;
    try {
        await checkFalseIngredientGroceryList(groceryListId, ingredientId);
        res.status(200).send();
    } catch (e) {
        console.error(e);
        res.status(404).send(
            `Unable to uncheck ingredient with id: ${ingredientId} in groceryList with id: ${groceryListId}`,
        );
    }
});

export default groceriesLists;
