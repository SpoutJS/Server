"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const minecraft_protocol_1 = require("minecraft-protocol");
const apis_1 = require("../apis");
const EventEmitter = require("events");
// @ts-ignore
const json = require("../../../package.json");
const logger_1 = require("../../utils/logger");
const serverLogs = logger_1.default.create('Spout').create('Server');
const broadcastDefaults = {
    to: null,
    formatColors: true,
};
class SpoutServer extends EventEmitter {
    constructor(server, config) {
        super();
        this.server = server;
        this.config = config;
        this.events = [];
        this.players = [];
        this.server.on('login', client => {
            const player = new apis_1.Player(this, client);
            this.players.push(player);
            for (const event of this.events) {
                if (event.event === 'login') {
                    const creation = new event(player, null);
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
    addEvent(...events) {
        this.events.push(...events);
        return this;
    }
    get maxPlayers() {
        return this.server.maxPlayers;
    }
    get clients() {
        return this.server.clients;
    }
    broadcast(message, opts = {}) {
        opts = { ...broadcastDefaults, ...opts };
        if (opts.formatColors && typeof message === 'string') {
            message = new apis_1.Chat().translate(message);
        }
        opts = { ...opts, ...broadcastDefaults };
        for (const client of Object.values(this.clients)) {
            if (client == null)
                continue;
            if (opts.to != null) {
                if (Array.isArray(opts.to)) {
                    if (!(opts.to.map(i => i.uuid).includes(client.uuid)))
                        continue;
                }
                else if (opts.to.uuid !== client.uuid) {
                    continue;
                }
            }
            client.write("chat", {
                message: JSON.stringify(message),
                position: 0,
                sender: "0",
            });
        }
        return this;
    }
    static create(opts, config) {
        serverLogs.info('Starting...');
        const server = minecraft_protocol_1.createServer(opts);
        serverLogs.info("Started server!");
        return new SpoutServer(server, config);
    }
    get version() {
        return json.version;
    }
    get developers() {
        return ["Blocks_n_more", "Corman"];
    }
}
exports.default = SpoutServer;
