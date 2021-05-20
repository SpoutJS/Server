import Event from '../../../core/events';
import { Player,  } from '../../../core/apis';

interface Data {
    message: string;
}
export class CommandEvent extends Event<Data> {
    static event = 'chat';
    run() {

    }
}

export class ChatEvent extends Event<Data> {
    static event = 'chat';
    run() {
        if (this.data.message.startsWith('/')) {
            const cmdEvent = new CommandEvent(this.player, {
                message: this.data.message.slice(1)
            });
            this.player._server.emit('command', cmdEvent);
            if (cmdEvent.cancelled) {
                cmdEvent.run();
                return;
            }
        }
        this.player.chat(this.data.message);
    }
}