import express from 'express';
import test from './api/test';
import recipes from './api/recipes/recipes_requests';
import user from './api/user/user_requests';
import ingredients from './api/ingredients/ingredients_requests';
import unities from './api/unities/unities_request';
import groceryList from './api/grocery-list/grocery_list_requests';

// Router and mounting
const api = express.Router();

api.use('/test', test);
api.use('/recipes', recipes);
api.use('/user', user);
api.use('/ingredients', ingredients);
api.use('/unities', unities);
api.use('/groceryList', groceryList);

export default api;
