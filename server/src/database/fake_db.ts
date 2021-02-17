import sqlite3 from 'sqlite3';
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

db.serialize(() => {
    db.run(`INSERT INTO User (username, date_creation, date_update) VALUES ('Lololapin', '2020-08-22', '2021-02-17')`);
    db.run(
        `INSERT INTO Recipe (name, number_parts, date_creation, date_update) VALUES ('Pates saumon', 2, '2021-02-17', '2021-02-17')`,
    ); /* 
    db.run(
        `INSERT INTO Groups (name, number_parts, date_creation, date_update) VALUES ('Pates saumon', 2, new Date(2020, 8, 22), new Date(2021, 2, 17))`,
    ); */
});
