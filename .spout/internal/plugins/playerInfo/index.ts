import SpoutServer from '../../../core/server';
import { Event } from '../SpoutAPI';
import * as MinecraftData from 'minecraft-data';
import { Player } from '../../../core/apis';

export class PlayerInfoEvent extends Event<any> {
    static event = 'login';
    static emit = 'registerPlayerInfo';
    sendPacketInfo(player: Player) {
        const { _server } = player;

        player.sendPacket('player_info', {
            action: 0,
            data: _server.players.map(otherPlayer => ({
                UUID: otherPlayer.uuid,
                name: otherPlayer.username,
                properties: player.profileProperties,
                gamemode: 0,
                ping: otherPlayer._client.latency
            }))
        });
    }
    run() {
        const { player } = this;
        this.sendPacketInfo(player);

        setInterval(() => {
            this.sendPacketInfo(player);
        }, 5000);
    }
}

export const main = (server: SpoutServer<any>) => {
    server.addEvent(PlayerInfoEvent);
}