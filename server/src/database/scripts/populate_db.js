import mocker from 'mocker-data-generator';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

sqlite3.verbose();

// User Table
const user = {
    id: {
        incrementalId: 0,
    },
    username: {
        faker: 'name.findName',
    },
    date_creation: {
        faker: 'date.past',
    },
    date_update: {
        faker: 'date.past',
    },
};

// Recipe Table
const recipe = {
    id: {
        incrementalId: 0,
    },
    firstName: {
        faker: 'name.firstName',
    },
    lastName: {
        faker: 'name.lastName',
    },
    name: {
        function: function () {
            return (this.object.lastName.substring(0, 5) + this.object.firstName.substring(0, 3)).toLowerCase();
        },
    },
    number_parts: {
        function: function () {
            return Math.floor(Math.random() * 10);
        },
    },
    date_creation: {
        faker: 'date.past',
    },
    date_update: {
        faker: 'date.past',
    },
    user_id: {
        hasOne: 'users',
        get: 'id',
    },
};

// Group Table
const group = {
    id: {
        incrementalId: 0,
    },
    name: {
        faker: 'name.jobTitle',
    },
    date_creation: {
        faker: 'date.past',
    },
    date_update: {
        faker: 'date.past',
    },
};

// Recipe_group table
const recipe_group = {
    recipe_id: {
        hasMany: 'recipes',
        max: 3,
        min: 1,
        get: 'id',
    },
    group_id: {
        hasOne: 'groups',
        get: 'id',
    },
};

// Ingredient table
const ingredient = {
    id: {
        incrementalId: 0,
    },
    name: {
        faker: 'commerce.productName',
    },
};

// Recipe_ingredient table
const recipe_ingredient = {
    recipe_id: {
        hasOne: 'recipes',
        get: 'id',
    },
    ingredient_id: {
        hasMany: 'ingredients',
        max: 5,
        min: 1,
        get: 'id',
    },
    quantity: {
        function: function () {
            return Math.floor(Math.random() * 500);
        },
    },
    unity: {
        faker: 'random.alpha',
    },
};

// Tag table
const tag = {
    id: {
        incrementalId: 0,
    },
    name: {
        faker: 'commerce.color',
    },
};

// Recipe_taf table
const recipe_tag = {
    recipe_id: {
        hasOne: 'recipes',
        get: 'id',
    },
    tag_id: {
        hasMany: 'tags',
        max: 5,
        min: 1,
        get: 'id',
    },
};

// Creating all the database
const data = mocker()
    .schema('users', user, 30)
    .schema('recipes', recipe, 30)
    .schema('groups', group, 30)
    .schema('recipes_groups', recipe_group, 5)
    .schema('ingredients', ingredient, 30)
    .schema('recipes_ingredients', recipe_ingredient, 20)
    .schema('tags', tag, 15)
    .schema('recipes_tags', recipe_tag, 30)
    .buildSync();
console.log(data);

// Users database
const users = data.users;
// Groups database
const groups = data.groups;
// Ingredients database
const ingredients = data.ingredients;
// Tags database
const tags = data.tags;
// Recipes database
const recipes = data.recipes;
// Recipes by group database
const recipes_groups = data.recipes_groups;
// Ingredients by recipe database
const recipes_ingredients = data.recipes_ingredients;
// Tags by recipe database
const recipes_tags = data.recipes_tags;

// Create async-await function to fullfill all tables with populate db
(async () => {
    const db = await open({
        filename: process.env.TEST_DATABASE || './database.sqlite',
        driver: sqlite3.Database,
    });

    // Fullfilled users table
    users.forEach((user) => {
        db.run(
            `INSERT INTO User (id, username, date_creation, date_update) VALUES ($id, $username, $date_creation, $date_update)`,
            {
                $id: user.id,
                $username: user.username,
                $date_creation: user.date_creation,
                $date_update: user.date_update,
            },
        );
    });

    // Fullfilled groups table
    groups.forEach((group) => {
        db.run(
            `INSERT INTO Groups (id, name, date_creation, date_update) VALUES ($id, $name, $date_creation, $date_update)`,
            {
                $id: group.id,
                $name: group.name,
                $date_creation: group.date_creation,
                $date_update: group.date_update,
            },
        );
    });

    // Fullfilled ingredients table
    ingredients.forEach((ingredient) => {
        db.run(
            `INSERT INTO Ingredient (id, name, date_creation, date_update) VALUES ($id, $name, $date_creation, $date_update)`,
            {
                $id: ingredient.id,
                $name: ingredient.name,
                $date_creation: ingredient.date_creation,
                $date_update: ingredient.date_update,
            },
        );
    });

    // Fullfilled tags table
    tags.forEach((tag) => {
        db.run(`INSERT INTO Tag (id, name) VALUES ($id, $name)`, {
            $id: tag.id,
            $name: tag.name,
        });
    });

    // Fullfilled recipes table
    recipes.forEach((recipe) => {
        db.run(
            `INSERT INTO Recipe (id, name, number_parts, date_creation, date_update, user_id) 
            VALUES ($id, $name, $number_parts, $date_creation, $date_update, $user_id)`,
            {
                $id: recipe.id,
                $name: recipe.name,
                $number_parts: recipe.number_parts,
                $date_creation: recipe.date_creation,
                $date_update: recipe.date_update,
                $user_id: recipe.user_id,
            },
        );
    });

    // Fullfilled recipes_groups table
    recipes_groups.forEach((recipes_group) => {
        db.run(`INSERT INTO Recipe_group (recipe_id, group_id) VALUES ($recipe_id, $group_id)`, {
            $recipe_id: recipes_group.recipe_id,
            $group_id: recipes_group.group_id,
        });
    });

    // Fullfilled recipes_ingredients table
    recipes_ingredients.forEach((recipe_ingredients) => {
        db.run(
            `INSERT INTO Recipe_ingredient (recipe_id, ingredient_id, quantity, unity) VALUES ($recipe_id, $ingredient_id, $quantity, $unity)`,
            {
                $recipe_id: recipe_ingredients.recipe_id,
                $ingredient_id: recipe_ingredients.ingredient_id,
                $quantity: recipe_ingredients.quantity,
                $unity: recipe_ingredients.unity,
            },
        );
    });

    // Fullfilled recipes_tags table
    recipes_tags.forEach((recipe_tags) => {
        db.run(`INSERT INTO Recipe_tag (recipe_id, tag_id) VALUES ($recipe_id, $tag_id)`, {
            $recipe_id: recipe_tags.recipe_id,
            $tag_id: recipe_tags.tag_id,
        });
    });
})();
