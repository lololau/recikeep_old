"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var errorhandler_1 = __importDefault(require("errorhandler"));
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var router_1 = __importDefault(require("./router"));
require("./app-config/firebase-config");
// Server creation
var app = express_1.default();
var PORT = process.env.PORT || 3000;
// Middlewares
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
app.use(body_parser_1.default.json());
app.use(errorhandler_1.default());
// Mounting router
app.use('/api', router_1.default);
// Starting server - app listening queries
app.listen(PORT, function () {
    console.log("Server is listening on " + PORT + ".");
});
exports.default = app;
