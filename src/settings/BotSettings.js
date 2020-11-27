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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var settingsModel_1 = __importDefault(require("./models/settingsModel"));
var BotSettings = /** @class */ (function () {
    function BotSettings(uri) {
        this.uri = uri;
        this.settings = {};
        this.isReady = false;
        this.settings['default'] = { prefix: '!' };
    }
    BotSettings.prototype.setup = function () {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c, document_1, object, e_1_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!!this.isReady) return [3 /*break*/, 14];
                        return [4 /*yield*/, mongoose_1.default.connect(this.uri, { useNewUrlParser: true, useUnifiedTopology: true })];
                    case 1:
                        _d.sent();
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 7, 8, 13]);
                        _b = __asyncValues(settingsModel_1.default.find());
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _b.next()];
                    case 4:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 6];
                        document_1 = _c.value;
                        object = document_1.toObject();
                        this.settings[object.server] = {
                            prefix: object.prefix,
                            category: object.category,
                            channel: object.channel,
                            role: object.role
                        };
                        _d.label = 5;
                    case 5: return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _d.trys.push([8, , 11, 12]);
                        if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 10];
                        return [4 /*yield*/, _a.call(_b)];
                    case 9:
                        _d.sent();
                        _d.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13:
                        this.isReady = true;
                        _d.label = 14;
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    BotSettings.prototype.createSettings = function (server) {
        return __awaiter(this, void 0, void 0, function () {
            var newSettings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //console.log('foo in');
                        this.settings[server] = this.settings['default'];
                        newSettings = new settingsModel_1.default({
                            server: server,
                            prefix: this.settings['default'].prefix,
                            category: String(this.settings['default'].category),
                            channel: String(this.settings['default'].channel)
                        });
                        //console.log(newSettings.toObject(), server);
                        return [4 /*yield*/, newSettings.save()];
                    case 1:
                        //console.log(newSettings.toObject(), server);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BotSettings.prototype.updateSettings = function (server, settings) {
        return __awaiter(this, void 0, void 0, function () {
            var document, _i, _a, key;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, settingsModel_1.default.findOne({ server: server })];
                    case 1:
                        document = _b.sent();
                        if (document == undefined)
                            return [2 /*return*/, false];
                        return [4 /*yield*/, document.updateOne(settings)];
                    case 2:
                        _b.sent();
                        for (_i = 0, _a = Object.keys(settings); _i < _a.length; _i++) {
                            key = _a[_i];
                            this.settings[server][key] = settings[key];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BotSettings.prototype.getSettings = function (server) {
        return this.settings[server];
    };
    return BotSettings;
}());
exports.default = BotSettings;
