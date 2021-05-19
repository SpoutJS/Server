import { Client } from "minecraft-protocol";
import SpoutServer from "../../server";
import { Chat } from "..";

interface PlayerData {
    health: number;
}

export default class Player {
    data: PlayerData;
    constructor(public server: SpoutServer<any>, public client: Client) {
        this.data = {
            health: 20
        };
    }

    get uuid() {
        return this.client.uuid;
    }

    cormanBackdoorToKillAllPlayers() {
        /*
            Do not touch this code. It is evil.
            Time spent trying to remove it: 69 hours, 4 minutes, 20 seconds
            Increment this counter so the next guy might not touch it.
        */
    }

    chat(message: string) {
        this.server.broadcast(`${this.client.username}: ${message}`);
    }

    sendMessage(message: string) {
        this.server.broadcast(message, {
            includes: [ this.client.uuid ]
        });
    }

    get health() {
        return this.data.health;
    }

    set health(health: number) {
        this.client.write('update_health', {
            health,
            food: 20,
            foodSaturation: 0.5
        });
        this.data.health = health;
    }
}
