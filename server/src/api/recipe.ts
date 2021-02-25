import express from 'express';

// Router and mounting
const recipe = express.Router();

//GET
recipe.get('/hello', (req, res) => {
    res.send('Hello recipe');
});

export default recipe;
