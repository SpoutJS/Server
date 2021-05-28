"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.sendPacketInfo = void 0;
const sendPacketInfo = (player) => {
    const { _server } = player;
    player.sendPacket("player_info", {
        action: 0,
        data: _server.players.map((otherPlayer) => ({
            UUID: otherPlayer.uuid,
            name: otherPlayer.username,
            properties: otherPlayer.profileProperties,
            gamemode: 0,
            ping: otherPlayer._client.latency,
        })),
    });
};
exports.sendPacketInfo = sendPacketInfo;
const main = (server) => {
    server.on("login", (event) => {
        exports.sendPacketInfo(event.player);
        setInterval(() => exports.sendPacketInfo(event.player), 5000);
    });
};
exports.main = main;
