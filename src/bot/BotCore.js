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
Object.defineProperty(exports, "__esModule", { value: true });
var callCode;
(function (callCode) {
    callCode[callCode["success"] = 0] = "success";
    callCode[callCode["fail"] = 1] = "fail";
    callCode[callCode["nothing"] = 2] = "nothing";
})(callCode || (callCode = {}));
var BotCore = /** @class */ (function () {
    function BotCore(bot, botSettings, token) {
        this.bot = bot;
        this.botSettings = botSettings;
        this.token = token;
        this.methodsList = {};
        this.methodsList['setPrefix'] = this.setPrefix;
        //this.methodsList['setDefaultSettings'] = this.setDefaultSettings;
        this.methodsList['setChannel'] = this.setChannel;
        this.methodsList['help'] = this.help;
    }
    BotCore.prototype.setup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.botSettings.setup()];
                    case 1:
                        _a.sent();
                        this.bot.login(this.token);
                        this.bot.on("ready", function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            console.log(this.bot.user.username + " started");
                            return [2 /*return*/];
                        }); }); });
                        this.bot.on('message', function (message) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.onMessage(message)];
                                    case 1:
                                        result = _a.sent();
                                        if (result.code != callCode.nothing) {
                                            if (result.code == callCode.success)
                                                message.channel.send(result.message);
                                            else
                                                message.channel.send(result.message);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.bot.on('voiceStateUpdate', function (oldState, newState) {
                            _this.onVoiceStateUpdate(oldState, newState);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    BotCore.prototype.onVoiceStateUpdate = function (oldState, newState) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var newChannel;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!(!((_a = newState.member) === null || _a === void 0 ? void 0 : _a.user.bot) && newState.channelID == this.botSettings.getSettings(newState.guild.id).channel)) return [3 /*break*/, 3];
                        return [4 /*yield*/, newState.guild.channels.create(newState.member.user.username + "'s channel", {
                                type: 'voice',
                                parent: (_c = (_b = newState.channel) === null || _b === void 0 ? void 0 : _b.parent) === null || _c === void 0 ? void 0 : _c.id,
                                permissionOverwrites: [
                                    { id: newState.member.id, allow: 292553745, type: 'member' },
                                    { id: newState.guild.roles.everyone, deny: 1048576, type: 'role' },
                                    { id: newState.guild.member(this.bot.user.id), allow: 1049648, type: 'member' }
                                ]
                            })];
                    case 1:
                        newChannel = _g.sent();
                        return [4 /*yield*/, newState.setChannel(newChannel)];
                    case 2:
                        _g.sent();
                        _g.label = 3;
                    case 3:
                        if (!(!((_d = newState.member) === null || _d === void 0 ? void 0 : _d.user.bot)
                            && ((_e = oldState.channel) === null || _e === void 0 ? void 0 : _e.parentID) == this.botSettings.getSettings(oldState.guild.id).category
                            && ((_f = oldState.channel) === null || _f === void 0 ? void 0 : _f.members.size) == 0
                            && oldState.channelID != this.botSettings.getSettings(oldState.guild.id).channel)) return [3 /*break*/, 5];
                        return [4 /*yield*/, oldState.channel.delete()];
                    case 4:
                        _g.sent();
                        _g.label = 5;
                    case 5: return [2 /*return*/, { code: callCode.nothing, message: 'nothing happened' }];
                }
            });
        });
    };
    BotCore.prototype.setPrefix = function (message, args) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        if (!(args != undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.botSettings.updateSettings(message.guild.id, { prefix: !!args[0] ? args[0] : '' })];
                    case 1:
                        result = _b.sent();
                        _b.label = 2;
                    case 2:
                        console.log("Successful seting a prefix on " + message.guild.id + " (" + message.guild.name + ").");
                        return [2 /*return*/, { code: callCode.success, message: 'Success.' }];
                    case 3:
                        _a = _b.sent();
                        console.log("Failed to set a prefix on " + message.guild.id + " (" + message.guild.name + ").");
                        return [2 /*return*/, { code: callCode.fail, message: 'Fail.' }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BotCore.prototype.help = function (message, args) {
        return __awaiter(this, void 0, void 0, function () {
            var helpMessage;
            return __generator(this, function (_a) {
                helpMessage = 'Commands:' + '\n' +
                    '!setChannel - Устанавливает канал для бота, **канал должен находится в отдельной категории**' + '\n' +
                    '!setPrefix - Устанавливает префикс' + '\n' +
                    '!help - выводит это сообщение';
                return [2 /*return*/, {
                        code: callCode.success,
                        message: helpMessage
                    }];
            });
        });
    };
    BotCore.prototype.setDefaultSettings = function (message, args) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.botSettings.createSettings(message.guild.id)];
                    case 1:
                        result = _b.sent();
                        console.log("Successful seting default settings on " + message.guild.id + " (" + message.guild.name + ").");
                        return [2 /*return*/, { code: callCode.success, message: 'Success.' }];
                    case 2:
                        _a = _b.sent();
                        console.log("Failed to set default settings on " + message.guild.id + " (" + message.guild.name + ").");
                        return [2 /*return*/, { code: callCode.fail, message: 'Fail.' }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BotCore.prototype.onMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var settings, prefix, content, command, isHavePermissions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(message.author.username != this.bot.user.username && message.author.discriminator != this.bot.user.discriminator)) return [3 /*break*/, 4];
                        if (!(message.guild != null)) return [3 /*break*/, 4];
                        settings = this.botSettings.getSettings(message.guild.id);
                        prefix = void 0;
                        if (settings == undefined) {
                            prefix = this.botSettings.getSettings('default').prefix;
                            this.setDefaultSettings(message, []);
                        }
                        else
                            prefix = settings.prefix;
                        content = message.content.substring(prefix.length);
                        if (!message.content.startsWith(prefix)) return [3 /*break*/, 4];
                        command = content.split(/\s/)[0];
                        return [4 /*yield*/, this.checkRoles(message.guild.member(message.author))];
                    case 1:
                        isHavePermissions = _a.sent();
                        if (!(this.methodsList.hasOwnProperty(command) && isHavePermissions.code == callCode.success)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.methodsList[command].call(this, message, content.split(/\s/).slice(1))];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        if (isHavePermissions.code == callCode.fail) {
                            return [2 /*return*/, isHavePermissions];
                        }
                        else {
                            return [2 /*return*/, { code: callCode.fail, message: 'Undefined command.' }];
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/, { code: callCode.nothing, message: 'nothing happened' }];
                }
            });
        });
    };
    BotCore.prototype.setChannel = function (message, args) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.botSettings.updateSettings(message.guild.id, {
                                channel: String(message.guild.member(message.author).voice.channelID),
                                category: String(message.guild.member(message.author).voice.channel.parentID)
                            })];
                    case 1:
                        result = _b.sent();
                        console.log("Successful seting a channel on " + message.guild.id + " (" + message.guild.name + ").");
                        return [2 /*return*/, { code: callCode.success, message: 'Success.' }];
                    case 2:
                        _a = _b.sent();
                        console.log("Failed to set a channel on " + message.guild.id + " (" + message.guild.name + ").");
                        return [2 /*return*/, { code: callCode.fail, message: 'Fail.' }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /*
      async setRole(message: Message, args: Array<string>) {
        let result;
        try{
            result = await this.botSettings.updateSettings(message.guild!.id, {
              role:
            });
            return callResult.success
        } catch {
          return callResult.fail
        }
      }
    */
    BotCore.prototype.checkRoles = function (user) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var result, adminPermission, roles, _i, _d, role;
            return __generator(this, function (_e) {
                adminPermission = 8;
                try {
                    console.log();
                    if (user.id == user.guild.ownerID)
                        return [2 /*return*/, { code: callCode.success, message: 'Success.' }];
                    roles = user.roles.cache;
                    for (_i = 0, _d = roles.keyArray(); _i < _d.length; _i++) {
                        role = _d[_i];
                        console.log((_a = roles.get(role)) === null || _a === void 0 ? void 0 : _a.permissions.bitfield, ((_b = roles.get(role)) === null || _b === void 0 ? void 0 : _b.permissions.bitfield) & adminPermission);
                        if (((_c = roles.get(role)) === null || _c === void 0 ? void 0 : _c.permissions.bitfield) & adminPermission) {
                            return [2 /*return*/, { code: callCode.success, message: 'Success.' }];
                        }
                    }
                    return [2 /*return*/, { code: callCode.fail, message: "You don't have permissions for that command." }];
                }
                catch (error) {
                    console.log(error);
                    return [2 /*return*/, { code: callCode.fail, message: "You don't have permissions for that command." }];
                }
                return [2 /*return*/];
            });
        });
    };
    return BotCore;
}());
exports.default = BotCore;
