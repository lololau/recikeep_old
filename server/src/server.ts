import dotenv from 'dotenv';
dotenv.config();

import errorHandler from 'errorhandler';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import api from './router';
import './app-config/firebase-config';

// Server creation
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/static', express.static(__dirname + '/../../client/build/static'));
app.use('/', express.static(__dirname + '/../../client/build'));

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
