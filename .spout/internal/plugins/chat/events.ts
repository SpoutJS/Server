import Event from "../../../core/events";
import { Player, Command } from "../../../core/apis";

interface Data {
    message: string;
}
export class CommandEvent extends Event<Data> {
    static event = "chat";

    run() {
        if (
            !new Command().isCommand(
                this.data.message.toString().substring(1).toLowerCase()
            )
        ) {
            this.player.sendMessage(
                this.player._server.config.messages.unknownCommand
            );
        } else {
            new Command().getCommand(
                this.data.message.toString().substring(1).toLowerCase()
            )(
                this.player,
                this.data.message.toString().substring(1).split(" ").slice(1)
            );
        }
    }
}

export class ChatEvent extends Event<Data> {
    static event = "chat";
    run() {
        if (!this.data.message.startsWith("/"))
            this.player.chat(this.data.message);
    }
}
