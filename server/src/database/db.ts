import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';

sqlite3.verbose();

// from https://github.com/kriasoft/node-sqlite#usage

const db = open({
    filename: process.env.TEST_DATABASE || './database.sqlite',
    driver: sqlite3.Database,
});

const openDb = async (): Promise<Database> => db;

export const closeDb = async (): Promise<void> => {
    try {
        const db = await openDb();
        await db.close();
    } catch (err) {
        console.warn('unable to close db', err);
    }
    return;
};

export default openDb;
