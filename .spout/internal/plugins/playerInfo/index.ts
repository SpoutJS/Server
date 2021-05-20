import SpoutServer from '../../../core/server';
import { Event } from '../SpoutAPI';
import * as MinecraftData from 'minecraft-data';
import { Player } from '../../../core/apis';
import { LoginEvent } from '../login';

export const sendPacketInfo = (player: Player) => {
    console.log('ALL ABOARD THE TRAIN!');
    const { _server } = player;

    console.log(_server.players.length);

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

export const main = (server: SpoutServer<any>) => {
    server.on('login', (event: LoginEvent) => {
        sendPacketInfo(event.player);
        setInterval(() => sendPacketInfo(event.player), 500);
    });
}