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
var sqlite3_1 = __importDefault(require("sqlite3"));
var sqlite_1 = require("sqlite");
sqlite3_1.default.verbose();
// from https://github.com/kriasoft/node-sqlite#usage
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var db, userId, recipeId, groupId, ingredients, ingredientId, tags, tagId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlite_1.open({
                    filename: process.env.TEST_DATABASE || './database.sqlite',
                    driver: sqlite3_1.default.Database,
                })];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run("INSERT INTO User (username, date_creation, date_update) VALUES ('Lololapin', '2020-08-22', '2021-02-17')")];
            case 2:
                _a.sent();
                return [4 /*yield*/, db.get("SELECT id FROM User WHERE username = 'Lololapin'")];
            case 3:
                userId = _a.sent();
                console.log(userId);
                return [4 /*yield*/, db.run("INSERT INTO Recipe (name, number_parts, date_creation, date_update, user_id) VALUES ('Pates saumon', 2, '2021-02-17', '2021-02-17', $userId)", { $userId: userId.id })];
            case 4:
                _a.sent();
                return [4 /*yield*/, db.get("SELECT id FROM Recipe WHERE name = 'Pates saumon'")];
            case 5:
                recipeId = _a.sent();
                console.log(recipeId);
                return [4 /*yield*/, db.run("INSERT INTO Groups (name, date_creation, date_update) VALUES ('Beeboo Recipes', '2021-02-17', '2021-02-17')")];
            case 6:
                _a.sent();
                return [4 /*yield*/, db.get("SELECT id FROM Groups WHERE name = 'Beeboo Recipes'")];
            case 7:
                groupId = _a.sent();
                console.log(groupId);
                return [4 /*yield*/, db.run("INSERT INTO Recipe_group (group_id, recipe_id) VALUES ($groupId, $recipeId)", {
                        $groupId: groupId.id,
                        $recipeId: recipeId.id,
                    })];
            case 8:
                _a.sent();
                return [4 /*yield*/, db.run("INSERT INTO Ingredient (name, date_creation, date_update) VALUES ('Pates tagliatelles', '2021-02-17', '2021-02-17')")];
            case 9:
                _a.sent();
                return [4 /*yield*/, db.run("INSERT INTO Ingredient (name, date_creation, date_update) VALUES ('Saumon', '2021-02-17', '2021-02-17')")];
            case 10:
                _a.sent();
                return [4 /*yield*/, db.run("INSERT INTO Ingredient (name, date_creation, date_update) VALUES ('Cr\u00E8me', '2021-02-17', '2021-02-17')")];
            case 11:
                _a.sent();
                return [4 /*yield*/, db.all("SELECT id FROM Ingredient")];
            case 12:
                ingredients = _a.sent();
                ingredientId = ingredients.map(function (ingredient) { return ingredient.id; });
                console.log(ingredientId);
                return [4 /*yield*/, db.run("INSERT INTO Recipe_ingredient (recipe_id, ingredient_id, quantity, unity) VALUES ($recipeId, $ingredientId, $quantity, $unity)", {
                        $recipeId: recipeId.id,
                        $ingredientId: ingredientId[0],
                        $quantity: 250,
                        $unity: 'g',
                    })];
            case 13:
                _a.sent();
                return [4 /*yield*/, db.run("INSERT INTO Recipe_ingredient (recipe_id, ingredient_id, quantity, unity) VALUES ($recipeId, $ingredientId, $quantity, $unity)", {
                        $recipeId: recipeId.id,
                        $ingredientId: ingredientId[1],
                        $quantity: 200,
                        $unity: 'g',
                    })];
            case 14:
                _a.sent();
                return [4 /*yield*/, db.run("INSERT INTO Recipe_ingredient (recipe_id, ingredient_id, quantity, unity) VALUES ($recipeId, $ingredientId, $quantity, $unity)", {
                        $recipeId: recipeId.id,
                        $ingredientId: ingredientId[2],
                        $quantity: 100,
                        $unity: 'g',
                    })];
            case 15:
                _a.sent();
                //Insert some tags into Tag table
                return [4 /*yield*/, db.run("INSERT INTO Tag (name) VALUES ('Entr\u00E9e')")];
            case 16:
                //Insert some tags into Tag table
                _a.sent();
                return [4 /*yield*/, db.run("INSERT INTO Tag (name) VALUES ('D\u00E9jeuner')")];
            case 17:
                _a.sent();
                return [4 /*yield*/, db.run("INSERT INTO Tag (name) VALUES ('Diner')")];
            case 18:
                _a.sent();
                return [4 /*yield*/, db.run("INSERT INTO Tag (name) VALUES ('Dessert')")];
            case 19:
                _a.sent();
                return [4 /*yield*/, db.run("INSERT INTO Tag (name) VALUES ('Accompagnement')")];
            case 20:
                _a.sent();
                return [4 /*yield*/, db.run("INSERT INTO Tag (name) VALUES ('L\u00E9gumes')")];
            case 21:
                _a.sent();
                return [4 /*yield*/, db.run("INSERT INTO Tag (name) VALUES ('Poisson')")];
            case 22:
                _a.sent();
                return [4 /*yield*/, db.run("INSERT INTO Tag (name) VALUES ('Viande')")];
            case 23:
                _a.sent();
                return [4 /*yield*/, db.run("INSERT INTO Tag (name) VALUES ('Fruits')")];
            case 24:
                _a.sent();
                return [4 /*yield*/, db.all("SELECT id FROM Tag")];
            case 25:
                tags = _a.sent();
                tagId = tags.map(function (tag) { return tag.id; });
                console.log(tagId);
                return [4 /*yield*/, db.run("INSERT INTO Recipe_tag (recipe_id, tag_id) VALUES ($recipeId, $tagId)", {
                        $recipeId: recipeId.id,
                        $tagId: tagId[1],
                    })];
            case 26:
                _a.sent();
                return [4 /*yield*/, db.run("INSERT INTO Recipe_tag (recipe_id, tag_id) VALUES ($recipeId, $tagId)", {
                        $recipeId: recipeId.id,
                        $tagId: tagId[2],
                    })];
            case 27:
                _a.sent();
                return [4 /*yield*/, db.run("INSERT INTO Recipe_tag (recipe_id, tag_id) VALUES ($recipeId, $tagId)", {
                        $recipeId: recipeId.id,
                        $tagId: tagId[7],
                    })];
            case 28:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
