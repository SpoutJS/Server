import Event from '../../../core/events';
import { Player } from '../../../core/apis';

interface Data {
    message: string;
}

export class ChatEvent extends Event {
    event = 'chat';
    constructor(public player: Player, public data: Data) {
        super();
    }
    run() {
        if (this.cancelled) return;
        this.player.sendMessage(this.data.message);
    }
}