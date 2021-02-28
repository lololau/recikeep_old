import sqlite3 from 'sqlite3';
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

db.serialize(() => {
    db.run('DROP TABLE IF EXISTS User');
    db.run(`CREATE TABLE User (
        id INTEGER UNIQUE,
        firstName TEXT,
        lastName TEXT,
        firebaseId TEXT UNIQUE,
        image BLOB,
        date_creation DATE,
        date_update DATE,
        PRIMARY KEY("id" AUTOINCREMENT)
    )`);
    db.run('DROP TABLE IF EXISTS Recipe');
    db.run(`CREATE TABLE Recipe (
        id INTEGER UNIQUE,
        name TEXT UNIQUE NOT NULL,
        presentation TEXT,
        number_parts INTEGER NOT NULL,
        time_presentation TEXT,
        time_cooking TEXT,
        date_creation DATE NOT NULL,
        date_update DATE NOT NULL,
        user_id INTEGER,
        recipe_photo_id INTEGER,
        recipe_description_id INTEGER,
        PRIMARY KEY("id" AUTOINCREMENT),
        FOREIGN KEY(user_id) REFERENCES User(id),
        FOREIGN KEY(recipe_photo_id) REFERENCES Recipe_photo(id),
        FOREIGN KEY(recipe_description_id) REFERENCES Recipe_description(id)
    )`);
    db.run('DROP TABLE IF EXISTS Recipe_photo');
    db.run(`CREATE TABLE Recipe_photo (
        id INTEGER UNIQUE,
        image BLOB,
        PRIMARY KEY("id" AUTOINCREMENT)
    )`);
    db.run('DROP TABLE IF EXISTS Recipe_description');
    db.run(`CREATE TABLE Recipe_description (
        id INTEGER UNIQUE,
        image BLOB,
        PRIMARY KEY("id" AUTOINCREMENT)
    )`);
    db.run('DROP TABLE IF EXISTS Groups');
    db.run(`CREATE TABLE Groups (
          id INTEGER UNIQUE,
          name TEXT NOT NULL,
          date_creation DATE,
          date_update DATE,
          PRIMARY KEY("id" AUTOINCREMENT)
      )`);
    db.run('DROP TABLE IF EXISTS Recipe_group');
    db.run(`CREATE TABLE Recipe_group (
        group_id INTEGER,
        recipe_id INTEGER,
        FOREIGN KEY(group_id) REFERENCES Groups(id),
        FOREIGN KEY(recipe_id) REFERENCES Recipe(id)
    )`);
    db.run('DROP TABLE IF EXISTS Ingredient');
    db.run(`CREATE TABLE Ingredient (
        id INTEGER UNIQUE,
        name TEXT NOT NULL,
        date_creation DATE,
        date_update DATE,
        PRIMARY KEY("id" AUTOINCREMENT)
    )`);
    db.run('DROP TABLE IF EXISTS Recipe_ingredient');
    db.run(`CREATE TABLE Recipe_ingredient (
        ingredient_id INTEGER,
        recipe_id INTEGER,
        quantity INTEGER NOT NULL,
        unity INTEGER NOT NULL,
        FOREIGN KEY(ingredient_id) REFERENCES Ingredient(id),
        FOREIGN KEY(recipe_id) REFERENCES Recipe(id)
    )`);
    db.run('DROP TABLE IF EXISTS Tag');
    db.run(`CREATE TABLE Tag (
        id INTEGER UNIQUE,
        name TEXT NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT)
    )`);
    db.run('DROP TABLE IF EXISTS Recipe_tag');
    db.run(`CREATE TABLE Recipe_tag (
        recipe_id INTEGER,
        tag_id INTEGER,
        FOREIGN KEY(recipe_id) REFERENCES Recipe(id),
        FOREIGN KEY(tag_id) REFERENCES Tag(id)
    )`);
});
