"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.RespawnEvent = void 0;
const SpoutAPI_1 = require("../SpoutAPI");
const MinecraftData = require("minecraft-data");
const mcData = MinecraftData('1.16.4');
let loginPacket = mcData.loginPacket;
class RespawnEvent extends SpoutAPI_1.Event {
    run() {
        this.player.sendPacket('respawn', {
            dimension: loginPacket.dimension,
            worldName: 'minecraft:overworld',
            hashedSeed: [0, 0],
            gameMode: this.player._server.config.spout.player.gamemode,
            previousGamemode: 255,
            isDebug: false,
            isFlat: false,
            copyMetadata: true
        });
        this.player.health = 20;
        this.player._server.emit('respawn', this);
    }
}
exports.RespawnEvent = RespawnEvent;
RespawnEvent.event = 'client_command';
RespawnEvent.useSpreadForData = true;
const main = (server) => {
    server.addEvent(RespawnEvent);
};
exports.main = main;
