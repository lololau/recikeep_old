"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// Router and mounting
var test = express_1.default.Router();
//GET
test.get('/get', function (req, res) {
    res.send('Hello Word');
});
//POST
test.post('/post', function (req, res) {
    var message = req.body.message;
    res.send("Hello " + message);
});
exports.default = test;
