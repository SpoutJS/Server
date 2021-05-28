"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginEvent = exports.ConnectEvent = exports.main = void 0;
const MinecraftData = require("minecraft-data");
const SpoutAPI_1 = require("../SpoutAPI");
const mcData = MinecraftData('1.16.4');
let loginPacket = mcData.loginPacket;
const main = (server) => {
    server.addEvent(LoginEvent);
};
exports.main = main;
class ConnectEvent extends SpoutAPI_1.Event {
    constructor() {
        super(...arguments);
        this.uncancellable = true;
    }
    run() {
        this.player.ready = true;
    }
}
exports.ConnectEvent = ConnectEvent;
ConnectEvent.emit = 'connect';
class LoginEvent extends SpoutAPI_1.Event {
    run() {
        const { player } = this;
        const { _server: server } = player;
        const { config } = server;
        player
            .sendPacket('login', {
            entityId: player.uuid,
            isHardcore: false,
            gameMode: {
                'survival': 0,
                'creative': 1,
                'spectator': 3,
                'adventure': 2,
                '0': 0,
                '1': 1,
                '2': 2,
                '3': 3
            }[config.spout.player.gamemode.toString().toLowerCase()],
            previousGameMode: 255,
            worldNames: loginPacket.worldNames,
            dimensionCodec: loginPacket.dimensionCodec,
            dimension: loginPacket.dimension,
            worldName: 'minecraft:overworld',
            hashedSeed: [0, 0],
            maxPlayers: server.maxPlayers,
            viewDistance: 15,
            reducedDebugInfo: false,
            enableRespawnScreen: true,
            isDebug: false,
            isFlat: false
        })
            .teleport({
            x: 0,
            y: 61,
            z: 0,
            yaw: 137,
            pitch: 0
        })
            .registerChannel('minecraft:brand', ['string', []])
            .sendChannel('minecraft:brand', 'Spout');
        SpoutAPI_1.MapSystem.generate(player, 10, 'flat');
        setTimeout(() => {
            const event = new ConnectEvent(this.player, null);
            server.emit('connect', event);
            event.run();
        }, 0);
    }
}
exports.LoginEvent = LoginEvent;
LoginEvent.event = 'login';
