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
var express_1 = __importDefault(require("express"));
var firebase_config_1 = require("../../app-config/firebase-config");
var ingredients_1 = require("../../database/ingredient/ingredients");
var ingredientsRecipe_1 = require("../../database/ingredient_recipe/ingredientsRecipe");
// Router and mounting
var ingredients = express_1.default.Router();
//GET - /api/ingredients/getByRecipes - get all ingredients for differents recipes by userId;
ingredients.post('/getByRecipes', firebase_config_1.verifyToken, firebase_config_1.verifyUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, requestGetIngredients, ingredients_2, ingredientsList, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = res.locals.userId;
                requestGetIngredients = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, ingredientsRecipe_1.getIngredientsByRecipes(userId, requestGetIngredients)];
            case 2:
                ingredients_2 = _a.sent();
                console.log('ingredients api:', ingredients_2);
                ingredientsList = ingredients_2.map(function (ingredient) {
                    var p = requestGetIngredients.find(function (elt) { return elt.recipe_id === ingredient.recipe_id; });
                    var newQuantity = Math.ceil((ingredient.quantity / ingredient.recipe_number_parts) * p.number_parts);
                    return {
                        ingredient: ingredient.ingredient,
                        ingredient_id: ingredient.ingredient_id,
                        quantity: newQuantity,
                        unity: ingredient.unity,
                        unity_id: ingredient.unity_id,
                    };
                });
                res.status(200).json({ ingredientsList: ingredientsList });
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                console.error(e_1);
                return [2 /*return*/, res.status(404).send('Unable to get ingredients for all recipes')];
            case 4: return [2 /*return*/];
        }
    });
}); });
//GET - /api/ingredients/getAll - get all base ingredients and ingredients by userId;
ingredients.get('/getAll', firebase_config_1.verifyToken, firebase_config_1.verifyUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, ingredients_3, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = res.locals.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, ingredients_1.getAllIngredients(userId)];
            case 2:
                ingredients_3 = _a.sent();
                res.status(200).json({ ingredients: ingredients_3 });
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                console.error(e_2);
                return [2 /*return*/, res.status(404).send('Unable to get the ingredients')];
            case 4: return [2 /*return*/];
        }
    });
}); });
//POST - /api/ingredients/add - add an ingredient into user database;
ingredients.post('/add', firebase_config_1.verifyToken, firebase_config_1.verifyUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, ingredientName, ingredient, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = res.locals.userId;
                ingredientName = req.body.name;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, ingredients_1.addIngredient(userId, ingredientName)];
            case 2:
                ingredient = _a.sent();
                res.status(200).json({ ingredient: ingredient });
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                console.error(e_3);
                return [2 /*return*/, res.status(404).send('Unable to add ingredient')];
            case 4: return [2 /*return*/];
        }
    });
}); });
// DELETE - '/api/ingredients/delete' - delete an ingredient from user database
ingredients.delete('/delete/:ingredientId', firebase_config_1.verifyToken, firebase_config_1.verifyUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, ingredientId, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = res.locals.userId;
                ingredientId = Number(req.params.ingredientId);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, ingredients_1.deleteIngredient(userId, ingredientId)];
            case 2:
                _a.sent();
                res.status(204).send();
                return [3 /*break*/, 4];
            case 3:
                e_4 = _a.sent();
                console.error(e_4);
                res.status(404).send('Unable to delete the ingredient');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//GET - /api/ingredients/search - search ingredients with searchTerm;
ingredients.get('/search/:searchTerm', firebase_config_1.verifyToken, firebase_config_1.verifyUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, searchTerm, ingredients_4, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = res.locals.userId;
                searchTerm = req.params.searchTerm;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, ingredients_1.searchIngredients(userId, searchTerm)];
            case 2:
                ingredients_4 = _a.sent();
                res.status(200).json({ ingredients: ingredients_4 });
                return [3 /*break*/, 4];
            case 3:
                e_5 = _a.sent();
                console.error(e_5);
                return [2 /*return*/, res.status(404).send('Unable to get the ingredients')];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = ingredients;