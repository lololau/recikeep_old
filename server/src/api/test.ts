import express from 'express';
import { verifyToken } from '../app-config/firebase-config';

// Router and mounting
const test = express.Router();

//GET
test.get('/get', verifyToken, (req, res) => {
    console.log(res.locals.decodedToken);
    res.send(`It works!`);
});

//POST
test.post('/post', (req, res) => {
    const message = req.body.message;
    res.send(`Hello ${message}`);
});

export default test;
