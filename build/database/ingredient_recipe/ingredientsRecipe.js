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
exports.getIngredientsByRecipes = exports.deleteIngredientsRecipe = exports.getIngredientsRecipe = exports.updateIngredientsRecipe = exports.addIngredientsRecipe = void 0;
var db_1 = __importDefault(require("../db"));
var named_placeholders_1 = __importDefault(require("named-placeholders"));
var unamed = named_placeholders_1.default();
var addIngredientsRecipe = function (recipeId, req) { return __awaiter(void 0, void 0, void 0, function () {
    var db;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default()];
            case 1:
                db = _a.sent();
                req.forEach(function (ingredient) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, db.run.apply(db, unamed("INSERT INTO Recipe_ingredient (recipe_id, ingredient_id, unity_id, quantity) \n        VALUES (:recipeId, :ingredientId, :unityId, :quantity)", {
                                    recipeId: recipeId,
                                    ingredientId: ingredient.ingredient_id,
                                    unityId: ingredient.unity_id,
                                    quantity: ingredient.quantity,
                                }))];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); };
exports.addIngredientsRecipe = addIngredientsRecipe;
// Update ingredients by recipeId
var updateIngredientsRecipe = function (recipeId, req) { return __awaiter(void 0, void 0, void 0, function () {
    var db;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run.apply(db, unamed("DELETE FROM Recipe_Ingredient WHERE recipe_id=:recipe_id", { recipe_id: recipeId }))];
            case 2:
                _a.sent();
                return [4 /*yield*/, exports.addIngredientsRecipe(recipeId, req)];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.updateIngredientsRecipe = updateIngredientsRecipe;
// Get ingredients by recipeId and userId
var getIngredientsRecipe = function (userId, recipeId) { return __awaiter(void 0, void 0, void 0, function () {
    var db, ingredients;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.all.apply(db, unamed("SELECT Ingredient.name as ingredient, Unity.name as unity, Recipe_ingredient.quantity as quantity, Recipe_ingredient.ingredient_id as ingredient_id, Recipe_ingredient.unity_id as unity_id\n                FROM Recipe_ingredient \n                JOIN Ingredient\n                ON Recipe_ingredient.ingredient_id = Ingredient.id\n                JOIN Unity\n                ON Recipe_ingredient.unity_id = Unity.id\n                JOIN Recipe\n                ON Recipe_ingredient.recipe_id = Recipe.id\n                WHERE Recipe.id=:recipeId  AND Recipe.user_id=:userId", {
                        recipeId: recipeId,
                        userId: userId,
                    }))];
            case 2:
                ingredients = _a.sent();
                return [2 /*return*/, ingredients];
        }
    });
}); };
exports.getIngredientsRecipe = getIngredientsRecipe;
// Delete ingredrients by recipeId when a recipe is deleted
var deleteIngredientsRecipe = function (recipeId) { return __awaiter(void 0, void 0, void 0, function () {
    var db;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run.apply(db, unamed("DELETE FROM Recipe_Ingredient WHERE recipe_id=:recipe_id", { recipe_id: recipeId }))];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.deleteIngredientsRecipe = deleteIngredientsRecipe;
// Get all ingredients for differents recipeId
var getIngredientsByRecipes = function (userId, numberPartsByRecipe) { return __awaiter(void 0, void 0, void 0, function () {
    var query, cond, db, ingredientsList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = "SELECT Ingredient.name as ingredient, Unity.name as unity, Recipe_ingredient.quantity as quantity, \n    Recipe_ingredient.ingredient_id as ingredient_id, Recipe_ingredient.unity_id as unity_id,\n    Recipe.id as recipe_id, Recipe.number_parts as recipe_number_parts\n        FROM Recipe_ingredient \n        JOIN Ingredient\n        ON Recipe_ingredient.ingredient_id = Ingredient.id\n        JOIN Unity\n        ON Recipe_ingredient.unity_id = Unity.id\n        JOIN Recipe\n        ON Recipe_ingredient.recipe_id = Recipe.id";
                cond = numberPartsByRecipe.map(function (e) { return "Recipe.id=" + e.recipe_id; }).join(' OR ');
                query += " WHERE (" + cond + ") AND Recipe.user_id=" + userId;
                return [4 /*yield*/, db_1.default()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.all(query)];
            case 2:
                ingredientsList = _a.sent();
                return [2 /*return*/, ingredientsList];
        }
    });
}); };
exports.getIngredientsByRecipes = getIngredientsByRecipes;
