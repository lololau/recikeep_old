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
var firebase_config_1 = require("../../app-config/firebase-config");
var ingredientsGroceryList_1 = require("../../database/ingredients_groceryList/ingredientsGroceryList");
// Router and mounting
var groceriesLists = express_1.default.Router();
//POST - /api/groceryList/add - add a groceryList to user database
groceriesLists.post('/add', firebase_config_1.verifyToken, firebase_config_1.verifyUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, ingredientsList, groceryList, sortByIngredientId_1, finalIngredientsList_1, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = res.locals.userId;
                ingredientsList = req.body.ingredients;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, ingredientsGroceryList_1.addGroceryList(userId)];
            case 2:
                groceryList = _a.sent();
                sortByIngredientId_1 = {};
                ingredientsList.forEach(function (elt) {
                    if (!sortByIngredientId_1[elt.ingredient_id]) {
                        sortByIngredientId_1[elt.ingredient_id] = [];
                    }
                    sortByIngredientId_1[elt.ingredient_id].push(elt);
                });
                finalIngredientsList_1 = [];
                Object.keys(sortByIngredientId_1).forEach(function (ingredientIdList) {
                    var sortByUnitId = {};
                    sortByIngredientId_1[ingredientIdList].forEach(function (ing) {
                        if (!sortByUnitId[ing.unity_id]) {
                            sortByUnitId[ing.unity_id] = [];
                        }
                        sortByUnitId[ing.unity_id].push(ing);
                    });
                    Object.keys(sortByUnitId).forEach(function (unitIdList) {
                        var newIngredientsList = sortByUnitId[unitIdList].reduce(function (a, b) {
                            var quantity = a.quantity + b.quantity;
                            return __assign(__assign({}, a), { quantity: quantity });
                        });
                        finalIngredientsList_1.push(newIngredientsList);
                    });
                });
                return [4 /*yield*/, ingredientsGroceryList_1.addIngredientsGroceryList(groceryList.id, finalIngredientsList_1)];
            case 3:
                _a.sent();
                res.status(201).json({ groceryList: groceryList });
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                console.error(e_1);
                return [2 /*return*/, res.status(404).send('Unable to add grocery list')];
            case 5: return [2 /*return*/];
        }
    });
}); });
//GET - /api/groceryList/:id - get a groceryList by userID and groceryListId
groceriesLists.get('/:id', firebase_config_1.verifyToken, firebase_config_1.verifyUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, groceryListId, groceryList, ingredients, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = res.locals.userId;
                groceryListId = Number(req.params.id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, ingredientsGroceryList_1.getGroceryListById(userId, groceryListId)];
            case 2:
                groceryList = _a.sent();
                return [4 /*yield*/, ingredientsGroceryList_1.getIngredientsGroceryList(userId, groceryListId)];
            case 3:
                ingredients = _a.sent();
                res.status(200).json({ groceryList: __assign(__assign({}, groceryList), { ingredients: ingredients }) });
                return [3 /*break*/, 5];
            case 4:
                e_2 = _a.sent();
                console.error(e_2);
                return [2 /*return*/, res.status(404).send("Unable to get the grocery list with id: " + groceryListId)];
            case 5: return [2 /*return*/];
        }
    });
}); });
//GET - /api/groceryList/ - get a groceryList by userID and by the most recent date_creation
groceriesLists.get('/', firebase_config_1.verifyToken, firebase_config_1.verifyUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, groceryList, ingredients, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = res.locals.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, ingredientsGroceryList_1.getMostRecentGroceryList(userId)];
            case 2:
                groceryList = _a.sent();
                return [4 /*yield*/, ingredientsGroceryList_1.getIngredientsGroceryList(userId, groceryList.id)];
            case 3:
                ingredients = _a.sent();
                res.status(200).json({ groceryList: __assign(__assign({}, groceryList), { ingredients: ingredients }) });
                return [3 /*break*/, 5];
            case 4:
                e_3 = _a.sent();
                console.error(e_3);
                return [2 /*return*/, res.status(404).send("Unable to get the latest grocery list")];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.default = groceriesLists;
