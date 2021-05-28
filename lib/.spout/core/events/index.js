"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Event {
    constructor(player, data) {
        this.player = player;
        this.data = data;
        this.uncancellable = false;
        this._cancelled = false;
        this.finished = false;
    }
    static schedule(...args) {
        switch (args.length) {
            case 1:
                return this.scheduleEvent(args[0]);
            case 2:
                return this.scheduleEvent(new this(...args));
            default:
                throw new Error(`Event.schedule only takes in 1-2 arguments, not ${args.length}`);
        }
    }
    static scheduleEvent(event) {
        const { player } = event;
        let { event: eventName } = this;
        if (this.emit != null) {
            eventName = this.emit;
        }
        player._server.emit(eventName, event);
        setTimeout(() => {
            if (event._cancelled)
                return;
            try {
                const val = event.run();
                if (val instanceof Promise) {
                    val.catch(err => {
                        console.error(`[SPOUT] Spout has encountered an unintended error when listening for ${this.constructor.name}`);
                        console.error(err);
                    });
                }
            }
            catch (err) {
                console.error(`[SPOUT] Spout has encountered an unintended error when listening for ${this.constructor.name}`);
                console.error(err);
            }
            event.finished = true;
        }, 0);
    }
    static init(player) {
        player._client.on(this.event, (...args) => {
            let data = this.useSpreadForData ? args : args[0];
            if (this.filter != null && this.filter(player, data))
                return;
            const event = new this(player, data);
            this.schedule(event);
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
    set cancelled(val) {
        if (this.uncancellable && val == false) {
            throw new Error(`You cannot cancel a ${Object.getPrototypeOf(this).name} instance because it is uncancellable`);
        }
        if (this.finished) {
            throw new Error(`Cannot change cancellation state of this ${this.constructor.name} event because this event has already been run.`);
        }
        this._cancelled = val;
    }
}
exports.default = Event;
Event.useSpreadForData = false;
