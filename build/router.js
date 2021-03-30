"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var test_1 = __importDefault(require("./api/test"));
var recipes_requests_1 = __importDefault(require("./api/recipes/recipes_requests"));
var user_requests_1 = __importDefault(require("./api/user/user_requests"));
var ingredients_requests_1 = __importDefault(require("./api/ingredients/ingredients_requests"));
var unities_request_1 = __importDefault(require("./api/unities/unities_request"));
var grocery_list_requests_1 = __importDefault(require("./api/grocery-list/grocery_list_requests"));
// Router and mounting
var api = express_1.default.Router();
api.use('/test', test_1.default);
api.use('/recipes', recipes_requests_1.default);
api.use('/user', user_requests_1.default);
api.use('/ingredients', ingredients_requests_1.default);
api.use('/unities', unities_request_1.default);
api.use('/groceriesLists', grocery_list_requests_1.default);
exports.default = api;
