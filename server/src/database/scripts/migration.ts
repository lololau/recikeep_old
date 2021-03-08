import sqlite3 from 'sqlite3';
import foodEn from '../ingredient/food-en';
import foodFr from '../ingredient/food-fr';
import { open } from 'sqlite';
import units from '../unity/unity-db';

(async () => {
    const db = await open({
        filename: process.env.TEST_DATABASE || './database.sqlite',
        driver: sqlite3.Database,
    });

    await db.run('DROP TABLE IF EXISTS User');
    await db.run(`CREATE TABLE User (
        id INTEGER UNIQUE,
        full_name TEXT,
        firebase_id TEXT UNIQUE,
        image BLOB,
        date_creation DATE,
        date_update DATE,
        PRIMARY KEY("id" AUTOINCREMENT)
    )`);
    await db.run('DROP TABLE IF EXISTS Recipe');
    await db.run(`CREATE TABLE Recipe (
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

    await db.run('DROP TABLE IF EXISTS Recipe_photo');
    await db.run(`CREATE TABLE Recipe_photo (
        id INTEGER UNIQUE,
        image BLOB,
        PRIMARY KEY("id" AUTOINCREMENT)
    )`);

    await db.run('DROP TABLE IF EXISTS Recipe_description');
    await db.run(`CREATE TABLE Recipe_description (
        id INTEGER UNIQUE,
        image BLOB,
        PRIMARY KEY("id" AUTOINCREMENT)
    )`);
    await db.run('DROP TABLE IF EXISTS Groups');
    await db.run(`CREATE TABLE Groups (
          id INTEGER UNIQUE,
          name TEXT NOT NULL,
          date_creation DATE,
          date_update DATE,
          PRIMARY KEY("id" AUTOINCREMENT)
      )`);

    await db.run('DROP TABLE IF EXISTS Recipe_group');
    await db.run(`CREATE TABLE Recipe_group (
        group_id INTEGER,
        recipe_id INTEGER,
        FOREIGN KEY(group_id) REFERENCES Groups(id),
        FOREIGN KEY(recipe_id) REFERENCES Recipe(id)
    )`);

    await db.run('DROP TABLE IF EXISTS Ingredient');
    await db.run(`CREATE TABLE Ingredient (
        id INTEGER UNIQUE,
        name TEXT NOT NULL,
        language TEXT NOT NULL,
        custom BOOL NOT NULL,
        user_id INTEGER,
        date_creation DATE,
        date_update DATE,
        PRIMARY KEY("id" AUTOINCREMENT),
        FOREIGN KEY(user_id) REFERENCES User(id)
    )`);

    await db.run('DROP TABLE IF EXISTS Unity');
    await db.run(`CREATE TABLE Unity (
        id INTEGER UNIQUE,
        name TEXT NOT NULL,
        user_id INTEGER,
        PRIMARY KEY("id" AUTOINCREMENT),
        FOREIGN KEY(user_id) REFERENCES User(id)
    )`);

    await db.run('DROP TABLE IF EXISTS Recipe_ingredient');
    await db.run(`CREATE TABLE Recipe_ingredient (
        ingredient_id INTEGER,
        recipe_id INTEGER,
        unity_id INTEGER,
        quantity INTEGER NOT NULL,
        FOREIGN KEY(ingredient_id) REFERENCES Ingredient_base(id),
        FOREIGN KEY(recipe_id) REFERENCES Recipe(id),
        FOREIGN KEY(unity_id) REFERENCES Unity(id)
    )`);

    await db.run('DROP TABLE IF EXISTS Tag');
    await db.run(`CREATE TABLE Tag (
        id INTEGER UNIQUE,
        name TEXT NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT)
    )`);

    await db.run('DROP TABLE IF EXISTS Recipe_tag');
    await db.run(`CREATE TABLE Recipe_tag (
        recipe_id INTEGER,
        tag_id INTEGER,
        FOREIGN KEY(recipe_id) REFERENCES Recipe(id),
        FOREIGN KEY(tag_id) REFERENCES Tag(id)
    )`);

    foodFr.forEach(async (food) => {
        await db.run(`INSERT INTO Ingredient (name, language, custom) VALUES ($name, $language, $custom)`, {
            $name: food,
            $language: 'fr',
            $custom: false,
        });
    });

    foodEn.forEach(async (food) => {
        await db.run(`INSERT INTO Ingredient (name, language, custom) VALUES ($name, $language, $custom)`, {
            $name: food,
            $language: 'en',
            $custom: false,
        });
    });

    units.forEach(async (unity) => {
        await db.run(`INSERT INTO Unity (name) VALUES ($name)`, {
            $name: unity,
        });
    });
})();
