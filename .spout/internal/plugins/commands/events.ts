import { Event, Command } from '../SpoutAPI';

export class TabComplete extends Event<any> {
	static event = 'tab_complete';
	run() {
		console.log(this.data);
	}
}
