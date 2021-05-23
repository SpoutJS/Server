import { Event, Player } from '../SpoutAPI';

// I have no clue what this code does, I just saw it used in flying squid so yeah
function conv(f: number) {
	let b = Math.floor(((f % 360) * 256) / 360);
	if (b < -128) b += 256;
	else if (b > 127) b -= 256;
	return b;
}

export class MoveEvent extends Event<any> {
	static event = 'position';
	run() {
		move(this.player, this.data);
	}
}

function move(player: Player, data: any) {
	let { x, y, z, onGround } = data;
	for (let user of player._server.players) {
		if (player.uuid === user.uuid) continue;
		user.sendPacket('rel_entity_move', {
			entityId: user.id,
			dX:x,
			dY:y,
			dZ:z,
			onGround,
		});
	}
}

function look(player: Player, data: any) {
	for (let other of player._server.players) {
		if (player.uuid === other.uuid) continue;
		let { onGround } = data;
		let yaw = conv(data.yaw);
		let pitch = conv(data.pitch);
		other.sendPacket('entity_look', {
			entityId: player.id,
			yaw,
			pitch,
			onGround,
		});
		other.sendPacket('entity_head_rotation', {
			entityId: player.id,
			headYaw: yaw,
		});
	}
}

export class LookEvent extends Event<any> {
	static event = 'look';
	run() {
		look(this.player, this.data);
	}
}

export class MoveLookEvent extends Event<any> {
	static event = 'position_look';
	run() {
		look(this.player, this.data);
		move(this.player, this.data);
	}
}
