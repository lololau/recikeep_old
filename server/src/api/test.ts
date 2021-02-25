import express from 'express';

// Router and mounting
const test = express.Router();

//GET
test.get('/get', (req, res) => {
    res.send('Hello Word');
});

//POST
test.post('/post', (req, res) => {
    const message = req.body.message;
    res.send(`Hello ${message}`);
});

export default test;
