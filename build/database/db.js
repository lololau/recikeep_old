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
var mysql_1 = __importDefault(require("mysql"));
// import sqlite3 from 'sqlite3';
// import { Database, open } from 'sqlite';
// sqlite3.verbose();
var config = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
};
console.log(config);
// from https://codeburst.io/node-js-mysql-and-promises-4c3be599909b
var Database = /** @class */ (function () {
    function Database(config) {
        this.connection = mysql_1.default.createConnection(config);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Database.prototype.query = function (sql, args) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log('query:', sql, ' with', args);
            _this.connection.query(sql, args, function (err, rows) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Database.prototype.all = function (sql, args) {
        return this.query(sql, args);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Database.prototype.get = function (sql, args) {
        return this.query(sql, args).then(function (rows) {
            if (rows.length === 1) {
                return rows[0];
            }
            throw new Error('got more than one result');
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Database.prototype.run = function (sql, args) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log('query:', sql, ' with', args);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            _this.connection.query(sql, args, function (err, results, rows) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results);
                }
            });
        });
    };
    Database.prototype.close = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.end(function (err) {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    };
    return Database;
}());
// from https://github.com/kriasoft/node-sqlite#usage
var db = new Database(config);
var openDb = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, db];
}); }); };
exports.default = openDb;
