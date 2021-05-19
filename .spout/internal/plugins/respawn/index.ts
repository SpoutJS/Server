import SpoutServer from '../../../core/server';
import { Event } from '../SpoutAPI';

export class RespawnEvent extends Event<any> {
    static event = 'event_action';
    static emit = 'respawn';
    static filter = (_, data: any) => data.actionId == 0;
    run() {
        console.log('Your not mom');
        this.player._server.emit('respawn', this);
    }
}

export const main = (server: SpoutServer<any>) => {
    server.addEvent(server);
}