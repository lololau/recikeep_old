import sqlite3 from 'sqlite3';
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

db.serialize(() => {
    db.run('DROP TABLE IF EXISTS Recipe');
    db.run(`CREATE TABLE Recipe (
        id INTEGER,
        name TEXT UNIQUE NOT NULL,
        presentation TEXT,
        number_parts INTEGER,
        time_presentation TEXT,
        time_cooking TEXT,
        date_creation DATE,
        date_update DATE,
        PRIMARY KEY("id" AUTOINCREMENT),
        FOREIGN KEY(user_id) REFERENCES User(id),
        FOREIGN KEY(recipe_photo_id) REFERENCES Recipe_photo(id),
        FOREIGN KEY(recipe_description_id) REFERENCES Recipe_description(id)
    )`);
    db.run('DROP TABLE IF EXISTS User');
    db.run(`CREATE TABLE User (
        id INTEGER,
        name TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        image BLOB,
        date_creation DATE,
        date_update DATE
    )`);
    db.run('DROP TABLE IF EXISTS Recipe_photo');
    db.run(`CREATE TABLE Recipe_photo (
        id INTEGER,
        image BLOB
    )`);
    db.run('DROP TABLE IF EXISTS Recipe_description');
    db.run(`CREATE TABLE Recipe_description (
        id INTEGER,
        image BLOB
    )`);
});
