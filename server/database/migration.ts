import sqlite3 from 'sqlite3';
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

