"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sqlite3_1 = __importDefault(require("sqlite3"));
var db = new sqlite3_1.default.Database(process.env.TEST_DATABASE || './database.sqlite');
db.serialize(function () {
    db.run('DROP TABLE IF EXISTS Recipe');
    db.run("CREATE TABLE Recipe (\n        id INTEGER UNIQUE,\n        name TEXT UNIQUE NOT NULL,\n        presentation TEXT,\n        number_parts INTEGER NOT NULL,\n        time_presentation TEXT,\n        time_cooking TEXT,\n        date_creation DATE NOT NULL,\n        date_update DATE NOT NULL,\n        user_id INTEGER,\n        recipe_photo_id INTEGER,\n        recipe_description_id INTEGER,\n        PRIMARY KEY(\"id\" AUTOINCREMENT),\n        FOREIGN KEY(user_id) REFERENCES User(id),\n        FOREIGN KEY(recipe_photo_id) REFERENCES Recipe_photo(id),\n        FOREIGN KEY(recipe_description_id) REFERENCES Recipe_description(id)\n    )");
    db.run('DROP TABLE IF EXISTS User');
    db.run("CREATE TABLE User (\n        id INTEGER UNIQUE,\n        username TEXT UNIQUE,\n        firebaseId TEXT UNIQUE,\n        image BLOB,\n        date_creation DATE,\n        date_update DATE,\n        PRIMARY KEY(\"id\" AUTOINCREMENT)\n    )");
    db.run('DROP TABLE IF EXISTS Recipe_photo');
    db.run("CREATE TABLE Recipe_photo (\n        id INTEGER UNIQUE,\n        image BLOB,\n        PRIMARY KEY(\"id\" AUTOINCREMENT)\n    )");
    db.run('DROP TABLE IF EXISTS Recipe_description');
    db.run("CREATE TABLE Recipe_description (\n        id INTEGER UNIQUE,\n        image BLOB,\n        PRIMARY KEY(\"id\" AUTOINCREMENT)\n    )");
    db.run('DROP TABLE IF EXISTS Groups');
    db.run("CREATE TABLE Groups (\n          id INTEGER UNIQUE,\n          name TEXT NOT NULL,\n          date_creation DATE,\n          date_update DATE,\n          PRIMARY KEY(\"id\" AUTOINCREMENT)\n      )");
    db.run('DROP TABLE IF EXISTS Recipe_group');
    db.run("CREATE TABLE Recipe_group (\n        group_id INTEGER,\n        recipe_id INTEGER,\n        FOREIGN KEY(group_id) REFERENCES Groups(id),\n        FOREIGN KEY(recipe_id) REFERENCES Recipe(id)\n    )");
    db.run('DROP TABLE IF EXISTS Ingredient');
    db.run("CREATE TABLE Ingredient (\n        id INTEGER UNIQUE,\n        name TEXT NOT NULL,\n        date_creation DATE,\n        date_update DATE,\n        PRIMARY KEY(\"id\" AUTOINCREMENT)\n    )");
    db.run('DROP TABLE IF EXISTS Recipe_ingredient');
    db.run("CREATE TABLE Recipe_ingredient (\n        ingredient_id INTEGER,\n        recipe_id INTEGER,\n        quantity INTEGER NOT NULL,\n        unity INTEGER NOT NULL,\n        FOREIGN KEY(ingredient_id) REFERENCES Ingredient(id),\n        FOREIGN KEY(recipe_id) REFERENCES Recipe(id)\n    )");
    db.run('DROP TABLE IF EXISTS Tag');
    db.run("CREATE TABLE Tag (\n        id INTEGER UNIQUE,\n        name TEXT NOT NULL,\n        PRIMARY KEY(\"id\" AUTOINCREMENT)\n    )");
    db.run('DROP TABLE IF EXISTS Recipe_tag');
    db.run("CREATE TABLE Recipe_tag (\n        recipe_id INTEGER,\n        tag_id INTEGER,\n        FOREIGN KEY(recipe_id) REFERENCES Recipe(id),\n        FOREIGN KEY(tag_id) REFERENCES Tag(id)\n    )");
});
