"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mocker_data_generator_1 = __importDefault(require("mocker-data-generator"));
var sqlite3_1 = __importDefault(require("sqlite3"));
var sqlite_1 = require("sqlite");
sqlite3_1.default.verbose();
// User Table
var user = {
    id: {
        incrementalId: 0,
    },
    full_name: {
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
var recipe = {
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
    presentation: {
        function: function () {
            return 'Recette de Guigui & laulau';
        },
    },
    number_parts: {
        function: function () {
            return Math.floor(Math.random() * 10);
        },
    },
    time_preparation: {
        function: function () {
            return Math.floor(Math.random() * 10);
        },
    },
    time_cooking: {
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
var group = {
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
var recipe_group = {
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
var ingredient = {
    id: {
        incrementalId: 0,
    },
    name: {
        faker: 'commerce.productName',
    },
    user_id: {
        hasOne: 'users',
        get: 'id',
    },
    date_creation: {
        faker: 'date.past',
    },
    date_update: {
        faker: 'date.past',
    },
};
// Unity table
var unity = {
    id: {
        incrementalId: 0,
    },
    name: {
        faker: 'commerce.color',
    },
    user_id: {
        hasOne: 'users',
        get: 'id',
    },
    date_creation: {
        faker: 'date.past',
    },
    date_update: {
        faker: 'date.past',
    },
};
// Recipe_ingredient table
var recipe_ingredient = {
    recipe_id: {
        hasOne: 'recipes',
        get: 'id',
    },
    ingredient_id: {
        hasOne: 'ingredients',
        get: 'id',
    },
    quantity: {
        function: function () {
            return Math.floor(Math.random() * 500);
        },
    },
    unity_id: {
        hasOne: 'unities',
        get: 'id',
    },
};
// Tag table
var tag = {
    id: {
        incrementalId: 0,
    },
    name: {
        faker: 'commerce.color',
    },
};
// Recipe_taf table
var recipe_tag = {
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
var data = mocker_data_generator_1.default()
    .schema('users', user, 30)
    .schema('recipes', recipe, 30)
    .schema('groups', group, 30)
    .schema('recipes_groups', recipe_group, 5)
    .schema('ingredients', ingredient, 30)
    .schema('unities', unity, 30)
    .schema('recipes_ingredients', recipe_ingredient, 20)
    .schema('tags', tag, 15)
    .schema('recipes_tags', recipe_tag, 30)
    .buildSync();
console.log(data);
// Users database
var users = data.users;
// Groups database
var groups = data.groups;
// Ingredients database
var ingredients = data.ingredients;
// Unities database
var unities = data.unities;
// Tags database
var tags = data.tags;
// Recipes database
var recipes = data.recipes;
// Recipes by group database
var recipes_groups = data.recipes_groups;
// Ingredients by recipe database
var recipes_ingredients = data.recipes_ingredients;
// Tags by recipe database
var recipes_tags = data.recipes_tags;
// Create async-await function to fullfill all tables with populate db
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var db;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlite_1.open({
                    filename: process.env.TEST_DATABASE || './database.sqlite',
                    driver: sqlite3_1.default.Database,
                })];
            case 1:
                db = _a.sent();
                // Fullfilled users table
                users.forEach(function (user) {
                    db.run("INSERT INTO User (id, full_name, date_creation, date_update) VALUES ($id, $full_name, $date_creation, $date_update)", {
                        $id: user.id,
                        $full_name: user.full_name,
                        $date_creation: user.date_creation,
                        $date_update: user.date_update,
                    });
                });
                // Fullfilled groups table
                groups.forEach(function (group) {
                    db.run("INSERT INTO Groups (id, name, date_creation, date_update) VALUES ($id, $name, $date_creation, $date_update)", {
                        $id: group.id,
                        $name: group.name,
                        $date_creation: group.date_creation,
                        $date_update: group.date_update,
                    });
                });
                // Fullfilled ingredients table
                ingredients.forEach(function (ingredient) {
                    db.run("INSERT INTO Ingredient (id, name, language, user_id, date_creation, date_update) VALUES ($id, $name, $language, $user_id, $date_creation, $date_update)", {
                        $id: ingredient.id,
                        $name: ingredient.name,
                        $language: 'fr',
                        $user_id: ingredient.user_id,
                        $date_creation: ingredient.date_creation,
                        $date_update: ingredient.date_update,
                    });
                });
                // Fullfilled unities table
                unities.forEach(function (unity) {
                    db.run("INSERT INTO Unity (id, name, user_id, date_creation, date_update) VALUES ($id, $name, $user_id, $date_creation, $date_update)", {
                        $id: unity.id,
                        $name: unity.name,
                        $user_id: unity.user_id,
                        $date_creation: unity.date_creation,
                        $date_update: unity.date_update,
                    });
                });
                // Fullfilled tags table
                tags.forEach(function (tag) {
                    db.run("INSERT INTO Tag (id, name) VALUES ($id, $name)", {
                        $id: tag.id,
                        $name: tag.name,
                    });
                });
                // Fullfilled recipes table
                recipes.forEach(function (recipe) {
                    db.run("INSERT INTO Recipe (id, name, presentation, number_parts, time_preparation, time_cooking, date_creation, date_update, user_id) \n            VALUES ($id, $name, $presentation, $number_parts, $time_preparation, $time_cooking, $date_creation, $date_update, $user_id)", {
                        $id: recipe.id,
                        $name: recipe.name,
                        $presentation: recipe.presentation,
                        $number_parts: recipe.number_parts,
                        $time_preparation: recipe.time_preparation,
                        $time_cooking: recipe.time_cooking,
                        $date_creation: recipe.date_creation,
                        $date_update: recipe.date_update,
                        $user_id: recipe.user_id,
                    });
                });
                // Fullfilled recipes_groups table
                recipes_groups.forEach(function (recipes_group) {
                    db.run("INSERT INTO Recipe_group (recipe_id, group_id) VALUES ($recipe_id, $group_id)", {
                        $recipe_id: recipes_group.recipe_id,
                        $group_id: recipes_group.group_id,
                    });
                });
                // Fullfilled recipes_ingredients table
                recipes_ingredients.forEach(function (recipe_ingredients) {
                    db.run("INSERT INTO Recipe_ingredient (recipe_id, ingredient_id, quantity, unity_id) VALUES ($recipe_id, $ingredient_id, $quantity, $unity_id)", {
                        $recipe_id: recipe_ingredients.recipe_id,
                        $ingredient_id: recipe_ingredients.ingredient_id,
                        $quantity: recipe_ingredients.quantity,
                        $unity_id: recipe_ingredients.unity_id,
                    });
                });
                // Fullfilled recipes_tags table
                recipes_tags.forEach(function (recipe_tags) {
                    db.run("INSERT INTO Recipe_tag (recipe_id, tag_id) VALUES ($recipe_id, $tag_id)", {
                        $recipe_id: recipe_tags.recipe_id,
                        $tag_id: recipe_tags.tag_id,
                    });
                });
                return [2 /*return*/];
        }
    });
}); })();
