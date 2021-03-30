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
exports.updateUser = exports.getUserIdByFirebaseID = exports.createUser = exports.getUserByFirebaseID = void 0;
var db_1 = __importDefault(require("./db"));
// Get all property from User by firebaseId
var getUserByFirebaseID = function (fbid) { return __awaiter(void 0, void 0, void 0, function () {
    var db, ret, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.get("SELECT * FROM User WHERE firebase_id = $firebaseId", {
                        $firebaseId: fbid,
                    })];
            case 2:
                ret = _a.sent();
                user = {
                    id: ret.id,
                    firebase_id: fbid,
                    full_name: ret.full_name,
                };
                return [2 /*return*/, user];
        }
    });
}); };
exports.getUserByFirebaseID = getUserByFirebaseID;
// Create User by firebaseId, firstName and lastName.
var createUser = function (fbid, fullN) { return __awaiter(void 0, void 0, void 0, function () {
    var db, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run("INSERT INTO User (firebase_id, full_name) VALUES ($firebaseId, $fullName)", {
                        $firebaseId: fbid,
                        $fullName: fullN,
                    })];
            case 2:
                _a.sent();
                user = exports.getUserByFirebaseID(fbid);
                return [2 /*return*/, user];
        }
    });
}); };
exports.createUser = createUser;
// Get UserId by firebaseId
var getUserIdByFirebaseID = function (fbid) { return __awaiter(void 0, void 0, void 0, function () {
    var db, ret;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.get("SELECT id FROM User WHERE firebase_id = $firebaseId", {
                        $firebaseId: fbid,
                    })];
            case 2:
                ret = _a.sent();
                return [2 /*return*/, ret.id];
        }
    });
}); };
exports.getUserIdByFirebaseID = getUserIdByFirebaseID;
// Create User by firebaseId, firstName and lastName.
var updateUser = function (fbid, fullN) { return __awaiter(void 0, void 0, void 0, function () {
    var db, user_id, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, exports.getUserIdByFirebaseID(fbid)];
            case 2:
                user_id = _a.sent();
                return [4 /*yield*/, db.run("UPDATE User SET full_name=$fullName WHERE id = $userId", {
                        $fullName: fullN,
                        $userId: user_id,
                    })];
            case 3:
                _a.sent();
                user = exports.getUserByFirebaseID(fbid);
                return [2 /*return*/, user];
        }
    });
}); };
exports.updateUser = updateUser;
