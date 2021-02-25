"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var test_1 = __importDefault(require("./api/test"));
var recipe_1 = __importDefault(require("./api/recipe"));
// Router and mounting
var api = express_1.default.Router();
api.use('/test', test_1.default);
api.use('/recipe', recipe_1.default);
exports.default = api;
