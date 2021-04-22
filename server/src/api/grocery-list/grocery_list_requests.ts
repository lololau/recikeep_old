// Dependencies
import express from 'express';
// Authentication
import { verifyToken, verifyUser } from '../../app-config/firebase-config';
// Database
import {
    addIngredientsGroceryList,
    IngredientsGroceryList,
    getIngredientsGroceryList,
    deleteIngredientsGroceryList,
    checkIngredient,
    GroceryList,
    getGroceryListIdByShareUid,
} from '../../database/ingredients_groceryList/ingredientsGroceryList';
import {
    addGroceryList,
    getGroceryListInformations,
    getAllGroceriesList,
    RequestAddGroceryList,
    deleteGroceryList,
    getShareGroceryList,
} from '../../database/groceries/groceries';

// Router and mounting
const groceriesLists = express.Router();

// POST - /api/groceriesLists/add - add a groceryList to user database by user's id, ingredients list and grocerylist's name
groceriesLists.post('/add', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    const ingredientsList: IngredientsGroceryList[] = req.body.ingredients;
    const groceryListRequest: RequestAddGroceryList = {
        name: req.body.name,
    };
    try {
        const groceryList = await addGroceryList(userId, groceryListRequest);
        await addIngredientsGroceryList(groceryList.id, ingredientsList);
        res.status(201).json({ groceryList: groceryList });
    } catch (e) {
        console.error(e);
        return res.status(404).send('Unable to add grocery list');
    }
});

// GET - /api/groceriesLists/getAll - get all groceries lists by user's id
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

// Method to get the final grocery list after making number-parts calculs
const getFinalGroceryList = (groceryList: GroceryList, ingredients: IngredientsGroceryList[]) => {
    // group all ingredients by id
    const sortByIngredientId: { [key: string]: IngredientsGroceryList[] } = {};
    ingredients.forEach((elt) => {
        if (!sortByIngredientId[elt.ingredient_id]) {
            sortByIngredientId[elt.ingredient_id] = [];
        }
        sortByIngredientId[elt.ingredient_id].push(elt);
    });

    // merge ingredients by unityId to create final ingredients list
    const finalIngredientsList: IngredientsGroceryList[] = [];
    Object.keys(sortByIngredientId).forEach((ingredientIdList) => {
        const sortByUnitId: { [key: string]: IngredientsGroceryList[] } = {};
        // group by unit's id
        sortByIngredientId[ingredientIdList].forEach((ing) => {
            if (!sortByUnitId[ing.unity_id]) {
                sortByUnitId[ing.unity_id] = [];
            }
            sortByUnitId[ing.unity_id].push(ing);
        });

        // add quantities of same ingredients with same unities
        Object.keys(sortByUnitId).forEach((unitIdList) => {
            const newIngredientsList = sortByUnitId[unitIdList].reduce((a, b) => {
                const quantity = a.quantity + b.quantity;
                return { ...a, quantity: quantity };
            });
            finalIngredientsList.push(newIngredientsList);
        });
    });

    // merge recipe's id to create final recipes list
    const finalRecipesList: { name: string; presentation: string }[] = [];

    const sortByRecipeId: { [key: string]: { name: string; presentation: string } } = {};

    Object.keys(sortByIngredientId).forEach((ingredientIdList) => {
        sortByIngredientId[ingredientIdList].forEach((ing) => {
            if (ing.recipe_id === null) {
                return;
            }
            if (!sortByRecipeId[ing.recipe_id]) {
                sortByRecipeId[ing.recipe_id] = { name: ing.recipe_name, presentation: ing.recipe_presentation };
            }
        });
    });

    // Convert object into list
    Object.keys(sortByRecipeId).forEach((recipeId) => {
        const sortByRecipe = sortByRecipeId[recipeId];
        finalRecipesList.push(sortByRecipe);
    });

    return { recipes: finalRecipesList, ingredients: finalIngredientsList };
};

// GET - /api/groceriesLists/:id - get a groceryList by user's id and groceryList's id
groceriesLists.get('/:id', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    const groceryListId = Number(req.params.id);

    try {
        // get groceryList informations : id, name, share_uid and user_id
        const groceryList = await getGroceryListInformations(userId, groceryListId);

        // get ingredients list from our grocery list
        const ingredients = await getIngredientsGroceryList(userId, groceryListId);

        // get finale grocery list
        const finalGroceryList = getFinalGroceryList(groceryList, ingredients);

        res.status(200).json({ groceryList: { ...groceryList, ...finalGroceryList } });
    } catch (e) {
        console.error(e);
        return res.status(404).send(`Unable to get the grocery list with id: ${groceryListId}`);
    }
});

//GET - /api/groceriesLists/share/:share_uid - get a grocery list by groceryList's share_uid
groceriesLists.get('/share/:share_uid', async (req, res) => {
    const share_uid = req.params.share_uid;

    try {
        const groceryList = await getShareGroceryList(share_uid);

        // get ingredients list from our grocery list
        const ingredients = await getIngredientsGroceryList(groceryList.user_id, groceryList.id);

        const finalGroceryList = getFinalGroceryList(groceryList, ingredients);

        console.log('finalRecipesList update: ', finalGroceryList);
        res.status(200).json({ groceryList: { ...groceryList, ...finalGroceryList } });
    } catch (e) {
        console.error(e);
        return res.status(404).send(`Unable to get the grocery list with share_uid: ${share_uid}`);
    }
});

// DELETE - '/api/groceriesLists/delete' - delete a grocery list by user's id and grocerylist's id
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

// PUT - 'api/groceriesLists/update' - update ingredient.checked to 0 or 1 by groceryList's id, ingredient's id and unit's id
groceriesLists.put('/update/:check', verifyToken, verifyUser, async (req, res) => {
    const requestCheck = {
        groceryListId: req.body.groceryListId,
        ingredientId: req.body.ingredient.ingredient_id,
        unityId: req.body.ingredient.unity_id,
        check: req.params.check.toLocaleLowerCase() === 'true',
    };
    try {
        await checkIngredient(requestCheck);
        res.status(200).send();
    } catch (e) {
        console.error(e);
        res.status(404).send(
            `Unable to uncheck ingredient with id: ${req.body.ingredient.ingredient_id} in groceryList with id: ${req.body.groceryListId}`,
        );
    }
});

// PUT - 'api/groceriesLists/updateShare' - update ingredient.checked to 0 or 1 of a shared grocery list by groceryList's id, ingredient's id and unit's id
groceriesLists.put('/updateShare/:check', async (req, res) => {
    const shareUid = req.body.groceryListShareUid;
    const groceryListId = await getGroceryListIdByShareUid(shareUid);

    const requestCheck = {
        groceryListId: Number(groceryListId),
        ingredientId: req.body.ingredient.ingredient_id,
        unityId: req.body.ingredient.unity_id,
        check: req.params.check.toLocaleLowerCase() === 'true',
    };
    try {
        await checkIngredient(requestCheck);
        res.status(200).send();
    } catch (e) {
        console.error(e);
        res.status(404).send(
            `Unable to uncheck ingredient with id: ${req.body.ingredient.ingredient_id} in groceryList with id: ${req.body.groceryListId}`,
        );
    }
});

export default groceriesLists;
