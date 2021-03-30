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
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//import foodEn from '../ingredient/food-en';
var food_fr_1 = __importDefault(require("../ingredient/food-fr"));
var unity_db_1 = __importDefault(require("../unity/unity-db"));
var db_1 = __importDefault(require("../db"));
var named_placeholders_1 = __importDefault(require("named-placeholders"));
var unamed = named_placeholders_1.default();
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var db;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default()];
            case 1:
                db = _a.sent();
                console.log('drop all tables...');
                return [4 /*yield*/, db.run('DROP TABLE IF EXISTS Recipe_tag')];
            case 2:
                _a.sent();
                return [4 /*yield*/, db.run('DROP TABLE IF EXISTS Tag')];
            case 3:
                _a.sent();
                return [4 /*yield*/, db.run('DROP TABLE IF EXISTS GroceryList_ingredient')];
            case 4:
                _a.sent();
                return [4 /*yield*/, db.run('DROP TABLE IF EXISTS GroceryList')];
            case 5:
                _a.sent();
                return [4 /*yield*/, db.run('DROP TABLE IF EXISTS Recipe_ingredient')];
            case 6:
                _a.sent();
                return [4 /*yield*/, db.run('DROP TABLE IF EXISTS Unity')];
            case 7:
                _a.sent();
                return [4 /*yield*/, db.run('DROP TABLE IF EXISTS Ingredient')];
            case 8:
                _a.sent();
                return [4 /*yield*/, db.run('DROP TABLE IF EXISTS Recipe')];
            case 9:
                _a.sent();
                return [4 /*yield*/, db.run('DROP TABLE IF EXISTS User')];
            case 10:
                _a.sent();
                console.log('create all tables...');
                return [4 /*yield*/, db.run("CREATE TABLE User (\n        id INTEGER UNIQUE AUTO_INCREMENT,\n        full_name VARCHAR(255),\n        firebase_id VARCHAR(255) UNIQUE,\n        date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n        date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n        PRIMARY KEY(id)\n    )")];
            case 11:
                _a.sent();
                return [4 /*yield*/, db.run("CREATE TABLE Recipe (\n        id INTEGER UNIQUE AUTO_INCREMENT,\n        name VARCHAR(255) NOT NULL,\n        presentation TEXT,\n        number_parts INTEGER NOT NULL,\n        time_preparation VARCHAR(255),\n        time_cooking VARCHAR(255),\n        date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n        date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n        user_id INTEGER,\n        PRIMARY KEY(id),\n        FOREIGN KEY(user_id) REFERENCES User(id)\n    )")];
            case 12:
                _a.sent();
                return [4 /*yield*/, db.run("CREATE TABLE Ingredient (\n        id INTEGER UNIQUE AUTO_INCREMENT,\n        name VARCHAR(255) NOT NULL,\n        language VARCHAR(255) NOT NULL,\n        user_id INTEGER,\n        date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n        date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n        PRIMARY KEY(id),\n        FOREIGN KEY(user_id) REFERENCES User(id)\n    )")];
            case 13:
                _a.sent();
                return [4 /*yield*/, db.run("CREATE TABLE Unity (\n        id INTEGER UNIQUE AUTO_INCREMENT,\n        name VARCHAR(255) NOT NULL,\n        upscaling VARCHAR(255),\n        upscaling_factor INTEGER,\n        downscaling VARCHAR(255),\n        downscaling_factor INTEGER,\n        user_id INTEGER,\n        date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n        date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n        PRIMARY KEY(id),\n        FOREIGN KEY(user_id) REFERENCES User(id)\n    )")];
            case 14:
                _a.sent();
                return [4 /*yield*/, db.run("CREATE TABLE Recipe_ingredient (\n        ingredient_id INTEGER,\n        recipe_id INTEGER,\n        unity_id INTEGER,\n        quantity INTEGER NOT NULL,\n        FOREIGN KEY(ingredient_id) REFERENCES Ingredient(id),\n        FOREIGN KEY(recipe_id) REFERENCES Recipe(id),\n        FOREIGN KEY(unity_id) REFERENCES Unity(id)\n    )")];
            case 15:
                _a.sent();
                return [4 /*yield*/, db.run("CREATE TABLE GroceryList (\n        id INTEGER UNIQUE AUTO_INCREMENT,\n        user_id INTEGER,\n        date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n        date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n        PRIMARY KEY(id),\n        FOREIGN KEY(user_id) REFERENCES User(id)\n    )")];
            case 16:
                _a.sent();
                return [4 /*yield*/, db.run("CREATE TABLE GroceryList_ingredient (\n        ingredient_id INTEGER,\n        groceryList_id INTEGER,\n        unity_id INTEGER,\n        quantity INTEGER NOT NULL,\n        FOREIGN KEY(ingredient_id) REFERENCES Ingredient(id),\n        FOREIGN KEY(groceryList_id) REFERENCES GroceryList(id),\n        FOREIGN KEY(unity_id) REFERENCES Unity(id)\n    )")];
            case 17:
                _a.sent();
                return [4 /*yield*/, db.run("CREATE TABLE Tag (\n        id INTEGER UNIQUE AUTO_INCREMENT,\n        name VARCHAR(255) NOT NULL,\n        PRIMARY KEY(id)\n    )")];
            case 18:
                _a.sent();
                return [4 /*yield*/, db.run("CREATE TABLE Recipe_tag (\n        recipe_id INTEGER,\n        tag_id INTEGER,\n        FOREIGN KEY(recipe_id) REFERENCES Recipe(id),\n        FOREIGN KEY(tag_id) REFERENCES Tag(id)\n    )")];
            case 19:
                _a.sent();
                console.log('inserting fr food...');
                food_fr_1.default.forEach(function (food) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, db.run.apply(db, unamed('INSERT INTO Ingredient (name, language) VALUES (:name, :language)', {
                                    name: food,
                                    language: 'fr',
                                }))];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                //console.log('inserting en food...');
                /* foodEn.forEach(async (food) => {
                    await db.run(
                        ...unamed(`INSERT INTO Ingredient (name, language) VALUES (:name, :language)`, {
                            name: food,
                            language: 'en',
                        }),
                    );
                }); */
                console.log('inserting units...');
                unity_db_1.default.forEach(function (unity) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, db.run.apply(db, unamed("INSERT INTO Unity (name, downscaling, downscaling_factor, upscaling, upscaling_factor) \n            VALUES (:name, :downscaling, :downscaling_factor, :upscaling, :upscaling_factor)", {
                                    name: unity.unit,
                                    downscaling: unity.downscaling,
                                    downscaling_factor: unity.downscaling_factor,
                                    upscaling: unity.upscaling,
                                    upscaling_factor: unity.upscaling_factor,
                                }))];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                console.log('done...');
                return [4 /*yield*/, db.close()];
            case 20:
                _a.sent();
                process.exit(0);
                return [2 /*return*/];
        }
    });
}); })();
