import SpoutServer from '../../../core/server';
import { Event } from '../SpoutAPI';
import * as MinecraftData from 'minecraft-data';

const mcData = MinecraftData('1.16.4');

let loginPacket = (mcData as any).loginPacket;

export class RespawnEvent extends Event<any> {
    static event = 'client_command';
    static useSpreadForData = true;
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

export const main = (server: SpoutServer<any>) => {
    server.addEvent(RespawnEvent);
}