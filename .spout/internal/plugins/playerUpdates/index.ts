import { ConnectEvent } from "../login";
import { sendPacketInfo } from "../playerInfo";
import { SpoutServer, Event } from "../SpoutAPI";

export const main = (server: SpoutServer<any>) => {
    server.on("connect", (event: ConnectEvent) => {
        const { player } = event;
        server.broadcast(`&8[&2+&8] &7${player.username}`);
        for (const other of server.players) {
            if (other.uuid == player.uuid) continue;
            console.log(
                `Creating entity of ${other.username} for ${player.username}`
            );
            sendPacketInfo(player);
            sendPacketInfo(other);
            player.sendPacket("named_entity_spawn", {
                entityId: other.id,
                playerUUID: other.uuid,
                x: 1,
                y: 61,
                z: 0,
                yaw: 0,
                pitch: 0,
            });
            setTimeout(() => {
                other.sendPacket("named_entity_spawn", {
                    entityId: player.id,
                    playerUUID: player.uuid,
                    x: 1,
                    y: 61,
                    z: 0,
                    yaw: 0,
                    pitch: 0,
                });
            });
        }
    });
    setInterval(() => {
        for (const player of server.players) {
            for (const other of server.players) {
                if(player.uuid === other.uuid) continue;
                if (!player.location) player.location = {x:0, y:61, z:0, yaw:0, pitch:0};
                other.sendPacket("entity_teleport", {
                    entityId: player.id,
                    x: player.location.x,
                    y: player.location.y,
                    z: player.location.z,
                    yaw: player.location.yaw,
                    pitch: player.location.pitch,
                    onGround: true
                });
            }
        }
    }, 10);
};
