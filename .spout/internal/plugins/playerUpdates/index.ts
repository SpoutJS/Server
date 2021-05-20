import { SpoutServer, Event } from "../SpoutAPI";

interface Data {
    yaw: number;
    pitch: number;
    onGround: boolean;
}

const conv = (f: number) => {
    let b = Math.floor((f % 360) * 256 / 360);
    if (b < -128) {
        b += 256;
    } else if (b > 127) {
        b -= 256;
    }
    return b;
  }

class LookEvent extends Event<Data> {
    static event = 'look';
    run() {
        const { player } = this;
        if (!player.ready) return;
        const { _server } = player;
        const { yaw, pitch, onGround } = this.data;
        const convYaw = conv(yaw);
        const convPitch = conv(pitch);
        for (const other of _server.players.filter(i => i.uuid != player.uuid)) {
            other.sendPacket('entity_look', {
                entityId: player.id,
                yaw: convYaw,
                pitch: convPitch,
                onGround: onGround
            });       
            other.sendPacket('entity_head_rotation', {
                entityId: player.id,
                headYaw: convYaw
            });
        }

    }
};

interface PositionData extends Data {
    x: number;
    y: number;
    z: number;
}

class PositionEvent extends Event<PositionData> {
    static event = 'position';
    run() {
        const { player } = this;
        if (!player.ready) return;
        const { _server } = player;
        new LookEvent(player, this.data).run();
        for (const other of _server.players.filter(i => i.uuid != player.uuid)) {
            other.sendPacket('entity_teleport', {
                entityId: player.id,
                ...this.data
            });
        }
    }
}

export const main = (server: SpoutServer<any>) => {
    server.addEvent(LookEvent, PositionEvent);
}