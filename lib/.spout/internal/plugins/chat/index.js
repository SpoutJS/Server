"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const events_1 = require("./events");
const main = (server) => {
    server.addEvent(events_1.ChatEvent);
    server.addEvent(events_1.CommandEvent);
};
exports.main = main;
