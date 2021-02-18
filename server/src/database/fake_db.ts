import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

sqlite3.verbose();

// from https://github.com/kriasoft/node-sqlite#usage

(async () => {
    const db = await open({
        filename: process.env.TEST_DATABASE || './database.sqlite',
        driver: sqlite3.Database,
    });

    await db.run(
        `INSERT INTO User (username, date_creation, date_update) VALUES ('Lololapin', '2020-08-22', '2021-02-17')`,
    );
    const userId = await db.get(`SELECT id FROM User WHERE username = 'Lololapin'`);
    console.log(userId);

    await db.run(
        `INSERT INTO Recipe (name, number_parts, date_creation, date_update, user_id) VALUES ('Pates saumon', 2, '2021-02-17', '2021-02-17', $userId)`,
        { $userId: userId.id },
    );
    const recipeId = await db.get(`SELECT id FROM Recipe WHERE name = 'Pates saumon'`);
    console.log(recipeId);

    await db.run(
        `INSERT INTO Groups (name, date_creation, date_update) VALUES ('Beeboo Recipes', '2021-02-17', '2021-02-17')`,
    );
    const groupId = await db.get(`SELECT id FROM Groups WHERE name = 'Beeboo Recipes'`);
    console.log(groupId);

    await db.run(`INSERT INTO Recipe_group (group_id, recipe_id) VALUES ($groupId, $recipeId)`, {
        $groupId: groupId.id,
        $recipeId: recipeId.id,
    });
    await db.run(
        `INSERT INTO Ingredient (name, date_creation, date_update) VALUES ('Pates tagliatelles', '2021-02-17', '2021-02-17')`,
    );
    await db.run(
        `INSERT INTO Ingredient (name, date_creation, date_update) VALUES ('Saumon', '2021-02-17', '2021-02-17')`,
    );
    await db.run(
        `INSERT INTO Ingredient (name, date_creation, date_update) VALUES ('Crème', '2021-02-17', '2021-02-17')`,
    );
    const ingredients = await db.all(`SELECT id FROM Ingredient`);
    const ingredientId = ingredients.map((ingredient) => ingredient.id);
    console.log(ingredientId);

    await db.run(
        `INSERT INTO Recipe_ingredient (recipe_id, ingredient_id, quantity, unity) VALUES ($recipeId, $ingredientId, $quantity, $unity)`,
        {
            $recipeId: recipeId.id,
            $ingredientId: ingredientId[0],
            $quantity: 250,
            $unity: 'g',
        },
    );
    await db.run(
        `INSERT INTO Recipe_ingredient (recipe_id, ingredient_id, quantity, unity) VALUES ($recipeId, $ingredientId, $quantity, $unity)`,
        {
            $recipeId: recipeId.id,
            $ingredientId: ingredientId[1],
            $quantity: 200,
            $unity: 'g',
        },
    );
    await db.run(
        `INSERT INTO Recipe_ingredient (recipe_id, ingredient_id, quantity, unity) VALUES ($recipeId, $ingredientId, $quantity, $unity)`,
        {
            $recipeId: recipeId.id,
            $ingredientId: ingredientId[2],
            $quantity: 100,
            $unity: 'g',
        },
    );
    //Insert some tags into Tag table
    await db.run(`INSERT INTO Tag (name) VALUES ('Entrée')`);
    await db.run(`INSERT INTO Tag (name) VALUES ('Déjeuner')`);
    await db.run(`INSERT INTO Tag (name) VALUES ('Diner')`);
    await db.run(`INSERT INTO Tag (name) VALUES ('Dessert')`);
    await db.run(`INSERT INTO Tag (name) VALUES ('Accompagnement')`);
    await db.run(`INSERT INTO Tag (name) VALUES ('Légumes')`);
    await db.run(`INSERT INTO Tag (name) VALUES ('Poisson')`);
    await db.run(`INSERT INTO Tag (name) VALUES ('Viande')`);
    await db.run(`INSERT INTO Tag (name) VALUES ('Fruits')`);

    const tags = await db.all(`SELECT id FROM Tag`);
    const tagId = tags.map((tag) => tag.id);
    console.log(tagId);

    await db.run(`INSERT INTO Recipe_tag (recipe_id, tag_id) VALUES ($recipeId, $tagId)`, {
        $recipeId: recipeId.id,
        $tagId: tagId[1],
    });
    await db.run(`INSERT INTO Recipe_tag (recipe_id, tag_id) VALUES ($recipeId, $tagId)`, {
        $recipeId: recipeId.id,
        $tagId: tagId[2],
    });
    await db.run(`INSERT INTO Recipe_tag (recipe_id, tag_id) VALUES ($recipeId, $tagId)`, {
        $recipeId: recipeId.id,
        $tagId: tagId[7],
    });
})();
