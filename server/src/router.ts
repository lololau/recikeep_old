import express from 'express';
import test from './api/test';
import recipe from './api/recipe';
import user from './api/user';

// Router and mounting
const api = express.Router();

api.use('/test', test);
api.use('/recipe', recipe);
api.use('/user', user);

export default api;
