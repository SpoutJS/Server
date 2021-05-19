import SpoutServer from '../../../core/server';
import { ChatEvent } from './events';

export const main = (server: SpoutServer<any>) => {
    server.addEvent(ChatEvent);
}