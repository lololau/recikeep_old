import express from 'express';
import { verifyToken, verifyUser } from '../../app-config/firebase-config';
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

//POST - /api/groceryList/add - add a groceryList to user database
groceriesLists.post('/add', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    const ingredientsList: IngredientsGroceryList[] = req.body.ingredients;
    console.log('ingredientsList: ', ingredientsList);
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

const getFinalGroceryList = (groceryList: GroceryList, ingredients: IngredientsGroceryList[]) => {
    // group all ingredients by id
    const sortByIngredientId: { [key: string]: IngredientsGroceryList[] } = {};
    ingredients.forEach((elt) => {
        if (!sortByIngredientId[elt.ingredient_id]) {
            sortByIngredientId[elt.ingredient_id] = [];
        }
        sortByIngredientId[elt.ingredient_id].push(elt);
    });
    console.log('sortByIngredientId: ', sortByIngredientId);

    // merge ingredients by unityId to create final ingredients list
    const finalIngredientsList: IngredientsGroceryList[] = [];
    Object.keys(sortByIngredientId).forEach((ingredientIdList) => {
        const sortByUnitId: { [key: string]: IngredientsGroceryList[] } = {};
        // group by unity Id
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

    // merge recipeId to create final recipes list
    const finalRecipesList: { name: string; presentation: string }[] = [];
    const sortByRecipeId: { [key: string]: { name: string; presentation: string } } = {};
    Object.keys(sortByIngredientId).forEach((ingredientIdList) => {
        sortByIngredientId[ingredientIdList].forEach((ing) => {
            if (!sortByRecipeId[ing.recipe_id]) {
                sortByRecipeId[ing.recipe_id] = { name: ing.recipe_name, presentation: ing.recipe_presentation };
            }
        });

        console.log('sortByRecipeId: ', sortByRecipeId);
    });

    // Convert object into list
    Object.keys(sortByRecipeId).forEach((recipeId) => {
        const sortByRecipe = sortByRecipeId[recipeId];
        finalRecipesList.push(sortByRecipe);
    });

    return { recipes: finalRecipesList, ingredients: finalIngredientsList };
};

//GET - /api/groceryList/:id - get a groceryList by userID and groceryListId
groceriesLists.get('/:id', verifyToken, verifyUser, async (req, res) => {
    const userId = res.locals.userId;
    const groceryListId = Number(req.params.id);

    try {
        const groceryList = await getGroceryListInformations(userId, groceryListId);

        // get ingredients list from our grocery list
        const ingredients = await getIngredientsGroceryList(userId, groceryListId);

        const finalGroceryList = getFinalGroceryList(groceryList, ingredients);

        console.log('finalRecipesList update: ', finalGroceryList);
        res.status(200).json({ groceryList: { ...groceryList, ...finalGroceryList } });
    } catch (e) {
        console.error(e);
        return res.status(404).send(`Unable to get the grocery list with id: ${groceryListId}`);
    }
});

//GET - /api/groceryList/share/:share_uid - get a grocery list by share_uid
groceriesLists.get('/share/:share_uid', async (req, res) => {
    const share_uid = req.params.share_uid;
    console.log('shareUid:', share_uid);

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

// PUT - 'api/groceriesList/update' - update ingredient.checked to 0 or 1 by groceryListId and ingredientId
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

// PUT - 'api/groceriesList/updateShare' - update ingredient.checked to 0 by groceryListId and ingredientId
groceriesLists.put('/updateShare/:check', async (req, res) => {
    const shareUid = req.body.groceryListShareUid;
    console.log('shareUid: ', shareUid);
    const groceryListId = await getGroceryListIdByShareUid(shareUid);
    console.log('groceryListId: ', groceryListId);

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
