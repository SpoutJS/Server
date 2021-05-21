import { Event, SpoutServer, Player } from "../SpoutAPI";
import * as MinecraftData from "minecraft-data";
import { LoginEvent } from "../login";

export const sendPacketInfo = (player: Player) => {
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

export const main = (server: SpoutServer<any>) => {
    server.on("login", (event: LoginEvent) => {
        sendPacketInfo(event.player);
        setInterval(() => sendPacketInfo(event.player), 5000);
    });
};
