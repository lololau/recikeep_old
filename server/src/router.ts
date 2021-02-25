import express from 'express';
import test from './api/test';
import recipe from './api/recipe';

// Router and mounting
const api = express.Router();

api.use('/test', test);
api.use('/recipe', recipe);

export default api;
