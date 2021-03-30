"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var recipe_1 = require("../../database/recipe/recipe");
var ingredientsRecipe_1 = require("../../database/ingredient_recipe/ingredientsRecipe");
var firebase_config_1 = require("../../app-config/firebase-config");
// Router and mounting
var recipes = express_1.default.Router();
//POST - /api/recipes/add - add a recipe to user database
recipes.post('/add', firebase_config_1.verifyToken, firebase_config_1.verifyUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, recipeRequest, ingredients, recipe, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = res.locals.userId;
                recipeRequest = {
                    name: req.body.name,
                    presentation: req.body.presentation,
                    number_parts: req.body.number_parts,
                    time_preparation: req.body.time_preparation,
                    time_cooking: req.body.time_cooking,
                };
                ingredients = req.body.ingredients;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, recipe_1.addRecipe(userId, recipeRequest)];
            case 2:
                recipe = _a.sent();
                return [4 /*yield*/, ingredientsRecipe_1.addIngredientsRecipe(recipe.id, ingredients)];
            case 3:
                _a.sent();
                res.status(201).json({ recipe: recipe });
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                console.error(e_1);
                return [2 /*return*/, res.status(404).send('Unable to add recipe')];
            case 5: return [2 /*return*/];
        }
    });
}); });
//GET - /api/recipes/getAll - get all recipes by userID
recipes.get('/getAll', firebase_config_1.verifyToken, firebase_config_1.verifyUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, recipes_1, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = res.locals.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, recipe_1.getAllRecipes(userId)];
            case 2:
                recipes_1 = _a.sent();
                res.status(200).json({ recipes: recipes_1 });
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                return [2 /*return*/, res.status(404).send('Unable to get recipes')];
            case 4: return [2 /*return*/];
        }
    });
}); });
//GET - /api/recipes/:id - get a recipe by userID and recipeId
recipes.get('/:id', firebase_config_1.verifyToken, firebase_config_1.verifyUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, recipeId, recipe, ingredients, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = res.locals.userId;
                recipeId = Number(req.params.id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, recipe_1.getRecipeInformations(userId, recipeId)];
            case 2:
                recipe = _a.sent();
                return [4 /*yield*/, ingredientsRecipe_1.getIngredientsRecipe(userId, recipeId)];
            case 3:
                ingredients = _a.sent();
                res.status(200).json({ recipe: __assign(__assign({}, recipe), { ingredients: ingredients }) });
                return [3 /*break*/, 5];
            case 4:
                e_3 = _a.sent();
                return [2 /*return*/, res.status(404).send("Unable to get recipe with id: " + recipeId)];
            case 5: return [2 /*return*/];
        }
    });
}); });
//PUT - /api/recipes/update/:id - update a recipe by recipeId and userId
recipes.put('/update/:id', firebase_config_1.verifyToken, firebase_config_1.verifyUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, recipeId, recipeRequest, ingredients, recipe, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = res.locals.userId;
                recipeId = Number(req.params.id);
                console.log('recipeId:', recipeId);
                console.log('userId:', userId);
                recipeRequest = {
                    name: req.body.name,
                    presentation: req.body.presentation,
                    number_parts: req.body.number_parts,
                    time_preparation: req.body.time_preparation,
                    time_cooking: req.body.time_cooking,
                };
                console.log('recipeRequest:', recipeRequest);
                ingredients = req.body.ingredients;
                console.log('ingredients:', ingredients);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, recipe_1.updateRecipe(userId, recipeId, recipeRequest)];
            case 2:
                recipe = _a.sent();
                return [4 /*yield*/, ingredientsRecipe_1.updateIngredientsRecipe(recipeId, ingredients)];
            case 3:
                _a.sent();
                res.status(200).json({ recipe: __assign(__assign({}, recipe), { ingredients: ingredients }) });
                return [3 /*break*/, 5];
            case 4:
                e_4 = _a.sent();
                console.error(e_4);
                return [2 /*return*/, res.status(404).send("Unable to update recipe with id: " + recipeId)];
            case 5: return [2 /*return*/];
        }
    });
}); });
// DELETE - '/api/recipes/delete' - delete an ingredient from user database
recipes.delete('/delete/:recipeId', firebase_config_1.verifyToken, firebase_config_1.verifyUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, recipeId, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = res.locals.userId;
                recipeId = Number(req.params.recipeId);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, ingredientsRecipe_1.deleteIngredientsRecipe(recipeId)];
            case 2:
                _a.sent();
                return [4 /*yield*/, recipe_1.deleteRecipe(userId, recipeId)];
            case 3:
                _a.sent();
                res.status(204).send();
                return [3 /*break*/, 5];
            case 4:
                e_5 = _a.sent();
                console.error(e_5);
                res.status(404).send('Unable to delete the recipe');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.default = recipes;
