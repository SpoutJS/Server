import { Client } from "minecraft-protocol";
import SpoutServer from "../../server";
import { Chat } from "..";
import EventEmitter = require("events");

const cap = (num: number, min: number, max: number) => {
    if (num > max) return max;
    if (num < min) return min;
    return num;
}

interface ProfileProperty {
    name: string;
    value: any;
    isSigned: true;
    signature: any;
}

interface PlayerData {
    health: number;
    maxHealth: number;
}

interface BaseLocation {
    x: number;
    y: number;
    z: number;
    yaw?: number;
    pitch?: number;
}

interface Location extends BaseLocation {
    yaw?: number;
    pitch?: number;
}

const cache = {};

export default class Player {
    data: PlayerData = {
        health: 20,
        maxHealth: 20
    };
    location: Location = null;
    ready = false;

    constructor(public _server: SpoutServer<any>, public _client: Client) {
        this.health = 20;
    }

    get id(): number {
        return (this._client as any).id;
    }
    get _mcServer() {
        return this._server.server;
    }
    get uuid() {
        return this._client.uuid;
    }

    sendPacket<T>(packet: string, data: T) {
        this._client.write(packet, data);
        return this;
    }
    sendPacketForEach<T>(packet: string, callback: (player: Player) => T) {
        for (const player of this._server.players) {
            if (player.uuid === this.uuid) continue;
            this.sendPacket(packet, callback(player));
        }
    }
    sendPacketNear<T>(packet: string, data: T) {
        for (const player of this._server.players) {
            if (player.uuid === this.uuid) continue;
            player.sendPacket(packet, data);
        }
    }

    teleport(loc: Location) {
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

    chat(message: string) {
        this._server.broadcast(`&7${this._client.username} &8» &f${message}`);
        return this;
    }

    sendMessage(message: string) {
        this._server.broadcast(message, { to: this });
        return this;
    }

    playSound(sound: string, loc: BaseLocation, volume = 1.0, pitch = 1.0, soundCategory = 0) {
        this.sendPacket('sound_effect', {
            soundName: sound,
            soundCategory,
            ...loc,
            pitch,
            volume
        });
        return this;
    }

    registerChannel(channel: string, typeDefiniton: any) {
        this._client.registerChannel(channel, typeDefiniton);
        return this;
    }
    
    sendChannel(channel: string, params: any){
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

    set health(health: number) {
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

    get profileProperties(): ProfileProperty[] {
        return this._client.profile.properties.map(({ name, value, signature }) => ({
            name,
            value,
            isSigned: true,
            signature
        }))
    }
}
