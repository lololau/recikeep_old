"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var firebase_config_1 = require("../app-config/firebase-config");
// Router and mounting
var test = express_1.default.Router();
//GET
test.get('/get', firebase_config_1.verifyToken, function (req, res) {
    console.log(res.locals.decodedToken);
    res.send("It works!");
});
//POST
test.post('/post', function (req, res) {
    var message = req.body.message;
    res.send("Hello " + message);
});
exports.default = test;
