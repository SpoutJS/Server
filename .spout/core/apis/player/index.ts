import { Client } from "minecraft-protocol";
import SpoutServer from "../../server";
import { Chat } from "..";
import EventEmitter = require("events");

const cap = (num: number, min: number, max: number) => {
    if (num > max) return max;
    if (num < min) return min;
    return num;
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
    data: PlayerData;
    constructor(public _server: SpoutServer<any>, public _client: Client) {
        this.data = {
            health: 20,
            maxHealth: 20
        };
        this.health = 20;
    }

    get _mcServer() {
        return this._server.server;
    }
    get uuid() {
        return this._client.uuid;
    }

    sendPacket<T>(packet: string, data: T) {
        this._client.write(packet, data);
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
    }

    cormanBackdoorToKillAllPlayers() {
        /*
            Do not touch this code. It is evil.
            Time spent trying to remove it: 69 hours, 4 minutes, 20 seconds
            Increment this counter so the next guy might not touch it.
        */
    }

    chat(message: string) {
        this._server.broadcast(new Chat().translate(`${this._client.username}: ${message}`));
    }

    sendMessage(message: string) {
        this._server.broadcast(new Chat().translate(message), { to: this });
    }

    playSound(sound: string, loc: BaseLocation, volume = 1.0, pitch = 1.0, soundCategory = 0) {
        this.sendPacket('sound_effect', {
            soundName: sound,
            soundCategory,
            ...loc,
            pitch,
            volume
        });
    }

    registerChannel(channel: string, typeDefiniton: any) {
        this._client.registerChannel(channel, typeDefiniton);
    }
    
    sendChannel(channel: string, params: any){
        this._client.writeChannel(channel, params);
    }

    isAlive() {
        return this.health > 0;
    }
    isDead() {
        return !(this.isAlive());
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
}
