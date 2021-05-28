"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveLookEvent = exports.LookEvent = exports.MoveEvent = void 0;
const SpoutAPI_1 = require("../SpoutAPI");
// I have no clue what this code does, I just saw it used in flying squid so yeah
function conv(f) {
    let b = Math.floor(((f % 360) * 256) / 360);
    if (b < -128)
        b += 256;
    else if (b > 127)
        b -= 256;
    return b;
}
class MoveEvent extends SpoutAPI_1.Event {
    run() {
        move(this.player, this.data);
    }
}
exports.MoveEvent = MoveEvent;
MoveEvent.event = 'position';
function move(player, data) {
    let { x, y, z, onGround } = data;
    for (let user of player._server.players) {
        if (player.uuid === user.uuid)
            continue;
        user.sendPacket('position', {
            entityId: user.id,
            x,
            y,
            z,
            onGround,
        });
    }
}
function look(player, data) {
    for (let other of player._server.players) {
        if (player.uuid === other.uuid)
            continue;
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
class LookEvent extends SpoutAPI_1.Event {
    run() {
        look(this.player, this.data);
    }
}
exports.LookEvent = LookEvent;
LookEvent.event = 'look';
class MoveLookEvent extends SpoutAPI_1.Event {
    run() {
        look(this.player, this.data);
        move(this.player, this.data);
    }
}
exports.MoveLookEvent = MoveLookEvent;
MoveLookEvent.event = 'position_look';
