import { ConnectEvent } from '../login';
import { sendPacketInfo } from '../playerInfo';
import { SpoutServer, Event } from '../SpoutAPI';

export const main = (server: SpoutServer<any>) => {
	server.on('connect', (event: ConnectEvent) => {
		const { player } = event;
		server.broadcast(`&8[&2+&8] &7${player.username}`);
		for (const other of server.players) {
			if (other.uuid == player.uuid) continue;
			console.log(
				`Creating entity of ${other.username} for ${player.username}`
			);
			sendPacketInfo(player);
			sendPacketInfo(other);
			player.sendPacket('named_entity_spawn', {
				entityId: other.id,
				playerUUID: other.uuid,
				x: 1,
				y: 61,
				z: 0,
				yaw: 0,
				pitch: 0,
			});
			setTimeout(() => {
				other.sendPacket('named_entity_spawn', {
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
};
