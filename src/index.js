"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var BotCore_1 = __importDefault(require("./bot/BotCore"));
var BotSettings_1 = __importDefault(require("./settings/BotSettings"));
require("dotenv/config");
var _a = process.env, token = _a.token, uri = _a.uri;
console.log(token, uri);
if (token == undefined || uri == undefined)
    throw new Error('pizda ti daun, gde token ili uri');
var botSettings = new BotSettings_1.default(uri);
var client;
do {
    client = new discord_js_1.Client();
} while (client == null);
//console.log('ku');
var botCore = new BotCore_1.default(client, botSettings, token);
botCore.setup();
