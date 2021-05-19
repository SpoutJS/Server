import {
    Server,
    createServer,
    ServerOptions,
    Client,
} from "minecraft-protocol";

import { Player, Chat } from "../apis/Spout";
import { ChatEvent } from "../events";

import * as EventEmitter from "events";

interface BroadcastOptions {
    excludes?: string[];
    includes?: string[];
    formatColors?: boolean;
}

const broadcastDefaults: BroadcastOptions = {
    excludes: null,
    includes: null,
    formatColors: true,
};

export default class SpoutServer extends EventEmitter {
    constructor(public server: Server) {
        super();
        this.server.on("login", (client) => {
            const player = new Player(this, client);
            ChatEvent.init(player);
        });
    }

    get clients() {
        return this.server.clients as { [id: string]: Client };
    }

    broadcast(message: string, opts: BroadcastOptions = {}) {
        opts = { ...opts, ...broadcastDefaults };
        for (const client of Object.values(this.clients)) {
            if (client == null) continue;
            if (
                (opts.excludes != null &&
                    opts.excludes.includes(client.uuid)) ||
                (opts.includes != null && !opts.includes.includes(client.uuid))
            )
                return;

            client.write("chat", {
                message: JSON.stringify({
                    translate: opts.formatColors
                        ? new Chat().translate(message)
                        : message,
                }),
                position: 0,
                sender: "0",
            });
        }
    }

    static create(opts: ServerOptions) {
        console.log("[SPOUT] Starting server!");
        const server = createServer(opts);
        console.log("[SPOUT] Started server!");
        return new SpoutServer(server);
    }
}
