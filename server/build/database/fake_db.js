"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sqlite3_1 = __importDefault(require("sqlite3"));
var db = new sqlite3_1.default.Database(process.env.TEST_DATABASE || './database.sqlite');
db.serialize(function () {
    db.run("INSERT INTO User (username, date_creation, date_update) VALUES ('Lololapin', '2020-08-22', '2021-02-17')")
        .get("SELECT id FROM User", function (err, row) {
        if (err) {
            throw err;
        }
        var userId = row.id;
        console.log(userId);
        db.run("INSERT INTO Recipe (name, number_parts, date_creation, date_update, user_id) VALUES ('Pates saumon', 2, '2021-02-17', '2021-02-17', " + userId + ")");
    })
        .run("INSERT INTO Groups (name, date_creation, date_update) VALUES ('Beeboo Recipes', '2021-02-17', '2021-02-17')");
    db.serialize(function () {
        var groupId;
        var recipeId;
        db.get("SELECT id FROM Groups", function (err, row) {
            if (err) {
                throw err;
            }
            groupId = row.id;
            console.log('groupId: ', groupId);
        }).get("SELECT id FROM Recipe", function (err, row) {
            if (err) {
                throw err;
            }
            recipeId = row.id;
            console.log(recipeId);
            db.run("INSERT INTO Recipe_group (group_id, recipe_id) VALUES ('" + groupId + "', '" + recipeId + "')");
        });
    });
});
/* db.run(
    `INSERT INTO Recipe (name, number_parts, date_creation, date_update, user_id) VALUES ('Pates saumon', 2, '2021-02-17', '2021-02-17', ${userId})`,
); */
