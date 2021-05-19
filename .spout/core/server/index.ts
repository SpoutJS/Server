import {
    Server,
    createServer,
    ServerOptions,
    Client,
} from "minecraft-protocol";

import { Player, Chat } from "../apis";

import * as EventEmitter from "events";
import Event from "../events";

interface BroadcastOptions {
    to?: Player | Player[];
    formatColors?: boolean;
}

const broadcastDefaults: BroadcastOptions = {
    to: null,
    formatColors: true,
};

interface Config {
    spout: {
        motd: string,
        maxPlayers: number,
        port: number,
        hardcore: boolean,
        player: {
            gamemode: 'survival' | 'creative' | 'adventure' | 'spectator',
            forceGamemode: boolean,
            allOP: boolean
        },
        world: {
            generator: string,
            viewDistance: number
        }
    },
    messages: {
        escapeCodes: boolean,
        unknownCommand: string,
        missingPermissions: string
    }
}

export default class SpoutServer<T extends typeof Event> extends EventEmitter {
    events: T[];
    constructor(public server: Server, public config: Config) {
        super();
        this.events = [];
        this.server.on("login", client => {
            const player = new Player(this, client);
            for (const event of this.events) {
                if (event.event === 'login') {
                    const creation: Event<T> = new (event as any)(player, null);
                    this.emit('login', creation);
                    if (!creation.cancelled) {
                        creation.run();
                    }
                    creation.finished = true;
                    continue;
                }
                event.init(player);
            }
        });
    }

    addEvent(event: T) {
        this.events.push(event);
    }

    get maxPlayers() {
        return this.server.maxPlayers;
    }
    get clients() {
        return this.server.clients as { [id: string]: Client };
    }

    broadcast(message: JSON[], opts: BroadcastOptions = {}) {
        opts = { ...opts, ...broadcastDefaults };
        for (const client of Object.values(this.clients)) {
            if (client == null) continue;
            if (opts.to != null) {
                if (Array.isArray(opts.to)) {
                    if (!(opts.to.map(i => i.uuid).includes(client.uuid))) continue;
                } else if (opts.to.uuid !== client.uuid) {
                    continue;
                }
            }

            client.write("chat", {
                message: JSON.stringify({
                    translate: '',
                    extras: message
                }),
                position: 0,
                sender: "0",
            });
        }
    }

    static create(opts: ServerOptions, config: Config) {
        console.log("[SPOUT] Starting server!");
        const server = createServer(opts);
        console.log("[SPOUT] Started server!");
        return new SpoutServer(server, config);
    }
}
