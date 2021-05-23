import { SpoutServer } from "../SpoutAPI";
import { MoveEvent, LookEvent } from "./events"

export const main = (server: SpoutServer<any>)=>{
    server.addEvent(MoveEvent);
    server.addEvent(LookEvent);
}