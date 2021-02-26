import sqlite3, { Database } from 'sqlite3';
import { open } from 'sqlite';

sqlite3.verbose();

// from https://github.com/kriasoft/node-sqlite#usage

const openDb = async () =>
    open({
        filename: process.env.TEST_DATABASE || './database.sqlite',
        driver: sqlite3.Database,
    });

export default openDb;
