import sqlite3 from 'sqlite3';
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

db.serialize(() => {
    db.run(`INSERT INTO User (username, date_creation, date_update) VALUES ('Lololapin', '2020-08-22', '2021-02-17')`);
    db.run(
        `INSERT INTO Recipe (name, number_parts, date_creation, date_update, user_id) 
        VALUES ('Pates saumon', 2, '2021-02-17', '2021-02-17')       
        SELECT id as user_id FROM User`,
    );
    db.run(
        `INSERT INTO Groups (name, date_creation, date_update) VALUES ('Beeboo Recipes', '2021-02-17', '2021-02-17')`,
    );

    db.serialize(() => {
        let groupId: number;
        let recipeId: number;

        db.get(`SELECT id FROM Groups`, (err, row) => {
            if (err) {
                throw err;
            }
            groupId = row.id;
            console.log('groupId: ', groupId);
        }).get(`SELECT id FROM Recipe`, (err, row) => {
            if (err) {
                throw err;
            }
            recipeId = row.id;
            console.log(recipeId);

            db.run(`INSERT INTO Recipe_group (group_id, recipe_id) VALUES ('${groupId}', '${recipeId}')`);
        });
    });
});
/* db.run(
    `INSERT INTO Recipe (name, number_parts, date_creation, date_update, user_id) VALUES ('Pates saumon', 2, '2021-02-17', '2021-02-17', ${userId})`,
); */
