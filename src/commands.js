"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commands = void 0;
var Commands = /** @class */ (function () {
    function Commands(bot) {
        this.commands = [
            { name: 'setVoiceChannel', command: this.setVoiceChannel, help: 'set voice channel' }
        ];
        this.bot = bot;
    }
    Commands.prototype.setVoiceChannel = function (message, args) {
    };
    return Commands;
}());
exports.Commands = Commands;
