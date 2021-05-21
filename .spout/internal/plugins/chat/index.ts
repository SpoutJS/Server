import SpoutServer from "../../../core/server";
import { ChatEvent, CommandEvent } from "./events";

export const main = (server: SpoutServer<any>) => {
    server.addEvent(ChatEvent);
    server.addEvent(CommandEvent);
};
