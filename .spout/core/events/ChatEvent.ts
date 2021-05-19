import Event from './Event';
import { Player } from '../apis/Spout';

interface Data {
    message: string;
}

export default class ChatEvent extends Event {
    event = 'chat';
    constructor(public player: Player, public data: Data) {
        super();
    }
    run() {
        if (this.cancelled) return;
        this.player.sendMessage(this.data.message);
    }
}