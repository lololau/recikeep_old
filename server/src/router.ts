import express from 'express';
import test from './api/test';
import recipe from './api/recipe/recipe_requests';
import user from './api/user/user_requests';
import ingredients from './api/ingredients/ingredients_requests';

// Router and mounting
const api = express.Router();

api.use('/test', test);
api.use('/recipe', recipe);
api.use('/user', user);
api.use('/ingredients', ingredients);

export default api;
