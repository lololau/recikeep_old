import dotenv from 'dotenv';
dotenv.config();

import foodEn from '../ingredient/food-en';
import foodFr from '../ingredient/food-fr';
import units from '../unity/unity-db';
import openDb from '../db';
import placeholders from 'named-placeholders';
const unamed = placeholders();

(async () => {
    const db = await openDb();

    console.log('drop all tables...');
    await db.run('DROP TABLE IF EXISTS Recipe_tag');
    await db.run('DROP TABLE IF EXISTS Tag');
    await db.run('DROP TABLE IF EXISTS Recipe_ingredient');
    await db.run('DROP TABLE IF EXISTS Unity');
    await db.run('DROP TABLE IF EXISTS Ingredient');
    await db.run('DROP TABLE IF EXISTS Recipe');
    await db.run('DROP TABLE IF EXISTS User');

    console.log('create all tables...');
    await db.run(`CREATE TABLE User (
        id INTEGER UNIQUE AUTO_INCREMENT,
        full_name VARCHAR(255),
        firebase_id VARCHAR(255) UNIQUE,
        date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY(id)
    )`);

    await db.run(`CREATE TABLE Recipe (
        id INTEGER UNIQUE AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        presentation TEXT,
        number_parts INTEGER NOT NULL,
        time_preparation VARCHAR(255),
        time_cooking VARCHAR(255),
        date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        user_id INTEGER,
        PRIMARY KEY(id),
        FOREIGN KEY(user_id) REFERENCES User(id)
    )`);

    await db.run(`CREATE TABLE Ingredient (
        id INTEGER UNIQUE AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        language VARCHAR(255) NOT NULL,
        user_id INTEGER,
        date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY(user_id) REFERENCES User(id)
    )`);

    await db.run(`CREATE TABLE Unity (
        id INTEGER UNIQUE AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        user_id INTEGER,
        date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY(user_id) REFERENCES User(id)
    )`);

    await db.run(`CREATE TABLE Recipe_ingredient (
        ingredient_id INTEGER,
        recipe_id INTEGER,
        unity_id INTEGER,
        quantity INTEGER NOT NULL,
        FOREIGN KEY(ingredient_id) REFERENCES Ingredient(id),
        FOREIGN KEY(recipe_id) REFERENCES Recipe(id),
        FOREIGN KEY(unity_id) REFERENCES Unity(id)
    )`);

    await db.run(`CREATE TABLE Tag (
        id INTEGER UNIQUE AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        PRIMARY KEY(id)
    )`);

    await db.run(`CREATE TABLE Recipe_tag (
        recipe_id INTEGER,
        tag_id INTEGER,
        FOREIGN KEY(recipe_id) REFERENCES Recipe(id),
        FOREIGN KEY(tag_id) REFERENCES Tag(id)
    )`);

    console.log('inserting fr food...');
    foodFr.forEach(async (food) => {
        await db.run(
            ...unamed(`INSERT INTO Ingredient (name, language) VALUES (:name, :language)`, {
                name: food,
                language: 'fr',
            }),
        );
    });

    console.log('inserting en food...');
    foodEn.forEach(async (food) => {
        await db.run(
            ...unamed(`INSERT INTO Ingredient (name, language) VALUES (:name, :language)`, {
                name: food,
                language: 'en',
            }),
        );
    });

    console.log('inserting units...');
    units.forEach(async (unity) => {
        await db.run(
            ...unamed(`INSERT INTO Unity (name) VALUES (:name)`, {
                name: unity,
            }),
        );
    });

    console.log('done...');

    await db.close();
    process.exit(0);
})();
