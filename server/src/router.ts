// Dependencies
import express from 'express';
// API
import recipes from './api/recipes/recipes_requests';
import user from './api/user/user_requests';
import ingredients from './api/ingredients/ingredients_requests';
import unities from './api/unities/unities_request';
import groceriesLists from './api/grocery-list/grocery_list_requests';

// Router and mounting
const api = express.Router();

api.use('/recipes', recipes);
api.use('/user', user);
api.use('/ingredients', ingredients);
api.use('/unities', unities);
api.use('/groceriesLists', groceriesLists);

export default api;
