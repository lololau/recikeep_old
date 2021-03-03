import express from 'express';
import test from './api/test';
import recipe from './api/recipe/recipe_requests';
import user from './api/user/user_requests';

// Router and mounting
const api = express.Router();

api.use('/test', test);
api.use('/recipe', recipe);
api.use('/user', user);

export default api;
