"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var test_1 = __importDefault(require("./api/test"));
var recipe_requests_1 = __importDefault(require("./api/recipe/recipe_requests"));
var user_requests_1 = __importDefault(require("./api/user/user_requests"));
// Router and mounting
var api = express_1.default.Router();
api.use('/test', test_1.default);
api.use('/recipe', recipe_requests_1.default);
api.use('/user', user_requests_1.default);
exports.default = api;
