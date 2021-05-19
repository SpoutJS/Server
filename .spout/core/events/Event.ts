import Player from '../apis/player';

import { Client } from "minecraft-protocol";

export default abstract class Event<T> {
    static event: string;
    cancelled: boolean;
    constructor(public player: Player, public data: T) {
        this.cancelled = false;
    }
    static init<T>(player: Player) {
        player.client.on(this.event, data => {
            const event: Event<T> = this.constructor(player, data);
            player.server.emit('chat', event);
            Promise.resolve(() => {
                if (event.cancelled) return;
                event.run();
            });
        });
    }
    cancel() {
        this.cancelled = true;
    }
    uncancel() {
        this.cancelled = false;
    }
    abstract run(): void;
}