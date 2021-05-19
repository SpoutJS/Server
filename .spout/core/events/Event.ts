import Player from '../apis/player';

import { Client } from "minecraft-protocol";

export default class Event {
    static event: string;
    cancelled: boolean;
    constructor() {
        this.cancelled = false;
    }
    static init(player: Player) {
        player.client.on(this.event, data => {
            const event = this.constructor(player, data);
            player.server.emit('chat', event);
            Promise.resolve(() => event.run());
        });
    }
    cancel() {
        this.cancelled = true;
    }
    uncancel() {
        this.cancelled = false;
    }
}