import Event from '../../../core/events';
import { Player } from '../../../core/apis';

interface Data {
    message: string;
}

export class ChatEvent extends Event<Data> {
    static event = 'chat';
    run() {
        this.player.chat(this.data.message)
    }
}