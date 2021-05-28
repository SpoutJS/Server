"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cap = (num, min, max) => {
    if (num > max)
        return max;
    if (num < min)
        return min;
    return num;
};
const cache = {};
class Player {
    constructor(_server, _client) {
        this._server = _server;
        this._client = _client;
        this.data = {
            health: 20,
            maxHealth: 20
        };
        this.location = null;
        this.ready = false;
        this.health = 20;
    }
    get id() {
        return this._client.id;
    }
    get _mcServer() {
        return this._server.server;
    }
    get uuid() {
        return this._client.uuid;
    }
    sendPacket(packet, data) {
        this._client.write(packet, data);
        return this;
    }
    sendPacketForEach(packet, callback) {
        for (const player of this._server.players) {
            if (player.uuid === this.uuid)
                continue;
            this.sendPacket(packet, callback(player));
        }
    }
    sendPacketNear(packet, data) {
        for (const player of this._server.players) {
            if (player.uuid === this.uuid)
                continue;
            player.sendPacket(packet, data);
        }
    }
    teleport(loc) {
        this.sendPacket("position", {
            x: loc.x,
            y: loc.y,
            z: loc.z,
            yaw: loc.yaw ?? 0,
            pitch: loc.pitch ?? 0,
            flags: 0x00,
        });
        return this;
    }
    cormanBackdoorToKillAllPlayers() {
        /*
            Do not touch this code. It is evil.
            Time spent trying to remove it: 69 hours, 4 minutes, 20 seconds
            Increment this counter so the next guy might not touch it.
        */
    }
    chat(message) {
        this._server.broadcast(`&7${this._client.username} &8» &f${message}`);
        return this;
    }
    sendMessage(message) {
        let text = Array.isArray(message) ? message.join('\n') : message;
        this._server.broadcast(text, { to: this });
        return this;
    }
    playSound(sound, loc, volume = 1.0, pitch = 1.0, soundCategory = 0) {
        this.sendPacket('sound_effect', {
            soundName: sound,
            soundCategory,
            ...loc,
            pitch,
            volume
        });
        return this;
    }
    registerChannel(channel, typeDefiniton) {
        this._client.registerChannel(channel, typeDefiniton);
        return this;
    }
    sendChannel(channel, params) {
        this._client.writeChannel(channel, params);
        return this;
    }
    isAlive() {
        return this.health > 0;
    }
    isDead() {
        return !(this.isAlive());
    }
    get username() {
        return this._client.username;
    }
    get health() {
        return this.data.health;
    }
    set health(health) {
        health = cap(health, 0, this.data.maxHealth);
        if (this.health === 0 && health === 0) {
            return;
        }
        this._client.write('update_health', {
            health,
            food: 20,
            foodSaturation: 0.5
        });
        this.data.health = health;
    }
    /*
      player.profileProperties=player._client.profile.properties
        .map(property => ({
          name:property.name,
          value:property.value,
          isSigned:true,
          signature:property.signature
        }));
    */
    get profileProperties() {
        return this._client.profile.properties.map(({ name, value, signature }) => ({
            name,
            value,
            isSigned: true,
            signature
        }));
    }
}
exports.default = Player;
