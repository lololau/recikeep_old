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
var food_en_1 = __importDefault(require("../ingredient/food-en"));
var food_fr_1 = __importDefault(require("../ingredient/food-fr"));
var sqlite_1 = require("sqlite");
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
                return [4 /*yield*/, db.run('DROP TABLE IF EXISTS User')];
            case 2:
                _a.sent();
                return [4 /*yield*/, db.run("CREATE TABLE User (\n        id INTEGER UNIQUE,\n        full_name TEXT,\n        firebase_id TEXT UNIQUE,\n        image BLOB,\n        date_creation DATE,\n        date_update DATE,\n        PRIMARY KEY(\"id\" AUTOINCREMENT)\n    )")];
            case 3:
                _a.sent();
                return [4 /*yield*/, db.run('DROP TABLE IF EXISTS Recipe')];
            case 4:
                _a.sent();
                return [4 /*yield*/, db.run("CREATE TABLE Recipe (\n        id INTEGER UNIQUE,\n        name TEXT UNIQUE NOT NULL,\n        presentation TEXT,\n        number_parts INTEGER NOT NULL,\n        time_presentation TEXT,\n        time_cooking TEXT,\n        date_creation DATE NOT NULL,\n        date_update DATE NOT NULL,\n        user_id INTEGER,\n        recipe_photo_id INTEGER,\n        recipe_description_id INTEGER,\n        PRIMARY KEY(\"id\" AUTOINCREMENT),\n        FOREIGN KEY(user_id) REFERENCES User(id),\n        FOREIGN KEY(recipe_photo_id) REFERENCES Recipe_photo(id),\n        FOREIGN KEY(recipe_description_id) REFERENCES Recipe_description(id)\n    )")];
            case 5:
                _a.sent();
                return [4 /*yield*/, db.run('DROP TABLE IF EXISTS Recipe_photo')];
            case 6:
                _a.sent();
                return [4 /*yield*/, db.run("CREATE TABLE Recipe_photo (\n        id INTEGER UNIQUE,\n        image BLOB,\n        PRIMARY KEY(\"id\" AUTOINCREMENT)\n    )")];
            case 7:
                _a.sent();
                return [4 /*yield*/, db.run('DROP TABLE IF EXISTS Recipe_description')];
            case 8:
                _a.sent();
                return [4 /*yield*/, db.run("CREATE TABLE Recipe_description (\n        id INTEGER UNIQUE,\n        image BLOB,\n        PRIMARY KEY(\"id\" AUTOINCREMENT)\n    )")];
            case 9:
                _a.sent();
                return [4 /*yield*/, db.run('DROP TABLE IF EXISTS Groups')];
            case 10:
                _a.sent();
                return [4 /*yield*/, db.run("CREATE TABLE Groups (\n          id INTEGER UNIQUE,\n          name TEXT NOT NULL,\n          date_creation DATE,\n          date_update DATE,\n          PRIMARY KEY(\"id\" AUTOINCREMENT)\n      )")];
            case 11:
                _a.sent();
                return [4 /*yield*/, db.run('DROP TABLE IF EXISTS Recipe_group')];
            case 12:
                _a.sent();
                return [4 /*yield*/, db.run("CREATE TABLE Recipe_group (\n        group_id INTEGER,\n        recipe_id INTEGER,\n        FOREIGN KEY(group_id) REFERENCES Groups(id),\n        FOREIGN KEY(recipe_id) REFERENCES Recipe(id)\n    )")];
            case 13:
                _a.sent();
                return [4 /*yield*/, db.run('DROP TABLE IF EXISTS Ingredient')];
            case 14:
                _a.sent();
                return [4 /*yield*/, db.run("CREATE TABLE Ingredient (\n        id INTEGER UNIQUE,\n        name TEXT NOT NULL,\n        language TEXT NOT NULL,\n        custom BOOL NOT NULL,\n        user_id INTEGER,\n        date_creation DATE,\n        date_update DATE,\n        PRIMARY KEY(\"id\" AUTOINCREMENT)\n    )")];
            case 15:
                _a.sent();
                return [4 /*yield*/, db.run('DROP TABLE IF EXISTS Recipe_ingredient')];
            case 16:
                _a.sent();
                return [4 /*yield*/, db.run("CREATE TABLE Recipe_ingredient (\n        ingredient_id INTEGER,\n        recipe_id INTEGER,\n        quantity INTEGER NOT NULL,\n        unity INTEGER NOT NULL,\n        FOREIGN KEY(ingredient_id) REFERENCES Ingredient_base(id),\n        FOREIGN KEY(recipe_id) REFERENCES Recipe(id)\n    )")];
            case 17:
                _a.sent();
                return [4 /*yield*/, db.run('DROP TABLE IF EXISTS Tag')];
            case 18:
                _a.sent();
                return [4 /*yield*/, db.run("CREATE TABLE Tag (\n        id INTEGER UNIQUE,\n        name TEXT NOT NULL,\n        PRIMARY KEY(\"id\" AUTOINCREMENT)\n    )")];
            case 19:
                _a.sent();
                return [4 /*yield*/, db.run('DROP TABLE IF EXISTS Recipe_tag')];
            case 20:
                _a.sent();
                return [4 /*yield*/, db.run("CREATE TABLE Recipe_tag (\n        recipe_id INTEGER,\n        tag_id INTEGER,\n        FOREIGN KEY(recipe_id) REFERENCES Recipe(id),\n        FOREIGN KEY(tag_id) REFERENCES Tag(id)\n    )")];
            case 21:
                _a.sent();
                food_fr_1.default.forEach(function (food) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, db.run("INSERT INTO Ingredient (name, language, custom) VALUES ($name, $language, $custom)", {
                                    $name: food,
                                    $language: 'fr',
                                    $custom: false,
                                })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                food_en_1.default.forEach(function (food) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, db.run("INSERT INTO Ingredient (name, language, custom) VALUES ($name, $language, $custom)", {
                                    $name: food,
                                    $language: 'en',
                                    $custom: false,
                                })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); })();
