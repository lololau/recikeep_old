import sqlite3, { Database } from 'sqlite3';
import { open } from 'sqlite';

sqlite3.verbose();

// from https://github.com/kriasoft/node-sqlite#usage

const db = open({
    filename: process.env.TEST_DATABASE || './database.sqlite',
    driver: sqlite3.Database,
});

const openDb = async () => db;

export default openDb;
