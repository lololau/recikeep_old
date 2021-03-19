import mysql from 'mysql';
// import sqlite3 from 'sqlite3';
// import { Database, open } from 'sqlite';

// sqlite3.verbose();

const config = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
};

console.log(config);

// from https://codeburst.io/node-js-mysql-and-promises-4c3be599909b
class Database {
    connection: mysql.Connection;

    constructor(config: mysql.ConnectionConfig) {
        this.connection = mysql.createConnection(config);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query<T>(sql: string | mysql.QueryOptions, args?: any): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows: T[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    all<T>(sql: string | mysql.QueryOptions, args?: any): Promise<T[]> {
        return this.query<T>(sql, args);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get<T>(sql: string | mysql.QueryOptions, args?: any): Promise<T> {
        return this.query<T>(sql, args).then((rows) => {
            if (rows.length === 1) {
                return rows[0];
            }
            throw new Error('got more than one result');
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    run(sql: string | mysql.QueryOptions, args?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            this.connection.query(sql, args, (err, results, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    close(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.end((err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}
// from https://github.com/kriasoft/node-sqlite#usage

const db = new Database(config);

/* const db = open({
    filename: process.env.TEST_DATABASE || './database.sqlite',
    driver: sqlite3.Database,
}); */

const openDb = async (): Promise<Database> => db;

export default openDb;
