import {
    Server,
    createServer,
    ServerOptions,
    Client,
} from 'minecraft-protocol';

// moved broadcast here

export default class SpoutServer {
    constructor(public server: Server) {}

    get clients() {
        return this.server.clients as { [id: string]: Client };
    }

    broadcast(message: string, excludes: number[], username?: string) { //can you give me terminal access so i can try to test it
        const translate = username ? 'chat.type.announcement' : 'chat.type.text';
        username = username ?? 'Server';
        for (const [ clientId, client ] of Object.entries(this.clients)) {
            let id = parseInt(clientId);
            if (client == null) continue;
            if (excludes.includes(id)) return;

            const msg = {
                translate,
                with: [username, message],
            };

            client.write('chat', {
                message: JSON.stringify(msg),
                position: 0,
                sender: '0',
            });
        }
    }

    static create(opts: ServerOptions) {
        const server = createServer(opts);
        return new SpoutServer(server);
    }
}
