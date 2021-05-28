"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatEvent = exports.CommandEvent = void 0;
const events_1 = require("../../../core/events");
const apis_1 = require("../../../core/apis");
class CommandEvent extends events_1.default {
    run() {
        if (!this.data.message.startsWith("/"))
            return;
        if (!new apis_1.Command().isCommand(this.data.message.toString().substring(1).toLowerCase())) {
            this.player.sendMessage(this.player._server.config.messages.unknownCommand);
        }
        else {
            new apis_1.Command().getCommand(this.data.message.toString().substring(1).toLowerCase())(this.player, this.data.message.toString().substring(1).split(" ").slice(1));
        }
    }
}
exports.CommandEvent = CommandEvent;
CommandEvent.event = "chat";
class ChatEvent extends events_1.default {
    run() {
        if (!this.data.message.startsWith("/"))
            this.player.chat(this.data.message);
    }
}
exports.ChatEvent = ChatEvent;
ChatEvent.event = "chat";
