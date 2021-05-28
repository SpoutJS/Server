"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands = new Map();
class Command {
    constructor(cmdData) {
        if (cmdData) {
            if (commands.has(cmdData.command.toLowerCase())) {
                console.log(`[SPOUT ERROR] Attempted command register of existing command ${cmdData.command}!`);
                return;
            }
            else {
                if (!cmdData.example)
                    cmdData.example = "/" + cmdData.command;
                cmdData.example.replace(/%command%/gi, cmdData.command);
                commands.set(cmdData.command.toLowerCase(), cmdData);
                if (cmdData.aliases) {
                    for (let command of cmdData.aliases) {
                        if (commands.has(command.toLowerCase())) {
                            console.log(`[SPOUT ERROR] Attempted command register of exsisting command ${command}!`);
                        }
                        else {
                            commands.set(command.toLowerCase(), cmdData);
                        }
                    }
                }
            }
        }
    }
    getCommand(command) {
        if (commands.has(command.toLowerCase())) {
            return commands.get(command.toLowerCase()).run;
        }
    }
    isCommand(command) {
        return commands.has(command.toLowerCase());
    }
    getCommandData(command) {
        return commands.get(command.toLowerCase());
    }
    get commands() {
        return commands;
    }
}
exports.default = Command;
