"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// Router and mounting
var recipe = express_1.default.Router();
//GET
recipe.get('/hello', function (req, res) {
    res.send('Hello recipe');
});
exports.default = recipe;
