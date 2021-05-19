import SpoutServer from '../../../core/server';
import { ChatEvent } from './events';

export const inject = (server: SpoutServer<any>) => {
    server.addEvent(ChatEvent);
}