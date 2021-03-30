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
exports.getIngredientById = exports.searchIngredients = exports.deleteIngredient = exports.addIngredient = exports.getAllIngredients = void 0;
var db_1 = __importDefault(require("../db"));
var named_placeholders_1 = __importDefault(require("named-placeholders"));
var unamed = named_placeholders_1.default();
//Get all base ingredients and by userId
var getAllIngredients = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var db, ingredients;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.all.apply(db, unamed("SELECT id, name, user_id FROM Ingredient WHERE language=:language AND (user_id IS NULL OR user_id=:userId)", {
                        userId: userId,
                        language: 'fr',
                    }))];
            case 2:
                ingredients = _a.sent();
                return [2 /*return*/, ingredients];
        }
    });
}); };
exports.getAllIngredients = getAllIngredients;
//Add an ingredient into user database;
var addIngredient = function (userId, ingredientName) { return __awaiter(void 0, void 0, void 0, function () {
    var db, result, ingredientId, ingredient;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run.apply(db, unamed("INSERT INTO Ingredient (user_id, name, language) VALUES (:userId, :name, :language)", {
                        userId: userId,
                        name: ingredientName,
                        language: 'fr',
                    }))];
            case 2:
                result = _a.sent();
                ingredientId = result.insertId;
                return [4 /*yield*/, db.get.apply(db, unamed("SELECT id, name, user_id FROM Ingredient WHERE id=:id", {
                        id: ingredientId,
                    }))];
            case 3:
                ingredient = _a.sent();
                return [2 /*return*/, ingredient];
        }
    });
}); };
exports.addIngredient = addIngredient;
//Delete an ingredient from user database
var deleteIngredient = function (userId, ingredientId) { return __awaiter(void 0, void 0, void 0, function () {
    var db, unities;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run.apply(db, unamed("DELETE FROM Ingredient WHERE id=:id AND user_id=:userId", {
                        id: ingredientId,
                        userId: userId,
                    }))];
            case 2:
                _a.sent();
                unities = exports.getAllIngredients(userId);
                return [2 /*return*/, unities];
        }
    });
}); };
exports.deleteIngredient = deleteIngredient;
// Search ingredients by searchTerm
var searchIngredients = function (userId, searchTerm) { return __awaiter(void 0, void 0, void 0, function () {
    var db, ingredients;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.all.apply(db, unamed("SELECT name FROM Ingredient WHERE name LIKE '%" + searchTerm + "%' AND (user_id IS NULL OR user_id=:userId)", {
                        userId: userId,
                    }))];
            case 2:
                ingredients = _a.sent();
                return [2 /*return*/, ingredients];
        }
    });
}); };
exports.searchIngredients = searchIngredients;
// Get an ingredient by IngredientId
var getIngredientById = function (ingredientId) { return __awaiter(void 0, void 0, void 0, function () {
    var db, ingredient;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.get.apply(db, unamed("SELECT id, name, user_id FROM Ingredient WHERE id=:id", { id: ingredientId }))];
            case 2:
                ingredient = _a.sent();
                return [2 /*return*/, ingredient];
        }
    });
}); };
exports.getIngredientById = getIngredientById;