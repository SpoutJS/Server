import SpoutServer from "../../../core/server";
import * as prisChunk from 'prismarine-chunk';
import * as Vec from 'vec3';
import * as MinecraftData from 'minecraft-data';
import { MapSystem, Event } from "../SpoutAPI";

const mcData = MinecraftData('1.16.4');

let loginPacket = (mcData as any).loginPacket;

export const main = (server: SpoutServer<any>) => {
    server.addEvent(LoginEvent);
}

export class LoginEvent extends Event<void> {
    static event = 'login';
    run() {
        const { player } = this;
        const { _server: server } = player;
        const { config } = server;

        player.sendPacket('login', {
            entityId: player.uuid,
            isHardcore: false,
            gameMode: config.spout.player.gamemode,
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
        });

        MapSystem.generate(player, 10, 'flat');

        player.teleport({
            x: 0,
            y: 61,
            z: 0,
            yaw: 137,
            pitch: 0,
        });
    }
}