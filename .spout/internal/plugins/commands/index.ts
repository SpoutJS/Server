import { SpoutServer } from '../SpoutAPI';
import { TabComplete } from './events';
import { load } from "./commands";

export const main = (server: SpoutServer<any>) => {
	server.addEvent(TabComplete);
    load(server);
};
