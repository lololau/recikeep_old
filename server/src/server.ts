// Dependencies
import dotenv from 'dotenv';
// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
dotenv.config();

import errorHandler from 'errorhandler';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
// Router
import api from './router';
// Authentication
import './app-config/firebase-config';

// Server creation
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(errorHandler());

// Mounting router
app.use('/api', api);

// Starting server - app listening queries
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}.`);
});

export default app;
