import Player from '../apis/player';

export default abstract class Event<T> {
    static event: string;
    static emit?: string;
    static useSpreadForData = false;
    static filter?: <T>(player: Player, data: T) => any;
    _cancelled: boolean;
    finished: boolean;
    uncancellable = false;
    constructor(public player: Player, public data: T) {
        this._cancelled = false;
        this.finished = false;
    }
    static init<T>(player: Player) {
        player._client.on(this.event, (...args) => {
            let data: T = this.useSpreadForData ? args : args[0];
            if (this.filter != null && this.filter(player, data)) return;
            const event: Event<T> = new (this as any)(player, data);
            let eventName = this.event;
            if (this.emit != null) {
                eventName = this.emit;
            } 
            player._server.emit(eventName, event);
            setTimeout(() => {
                if (event._cancelled) return;
                try {
                    const val = event.run();
                    if (val instanceof Promise) {
                        val.catch(err => {
                            console.error(`[SPOUT] Spout has encountered an unintended error when listening for ${this.constructor.name}`);
                            console.error(err);
                        });
                    }
                } catch (err) {
                    console.error(`[SPOUT] Spout has encountered an unintended error when listening for ${this.constructor.name}`);
                    console.error(err);                   
                }
                event.finished = true;
            }, 0);
        });
    }
    cancel() {
        this.cancelled = true;
    }
    uncancel() {
        this.cancelled = false;
    }
    get cancelled() {
        return this._cancelled;
    }
    set cancelled(val: boolean) {
        if (this.uncancellable && val == false) {
            throw new Error(
                `You cannot cancel a ${Object.getPrototypeOf(this).name} instance because it is uncancellable`
            )
        }
        if (this.finished) {
            throw new Error(
                `Cannot change cancellation state of this ${this.constructor.name} event because this event has already been run.`
            );
        }
        this._cancelled = val;
    }
    abstract run(): void | Promise<void>;
}