import { SpoutServer } from "../SpoutAPI";
import { MoveEvent, LookEvent, MoveLookEvent } from "./events"

export const main = (server: SpoutServer<any>)=>{
    server.addEvent(MoveEvent);
    server.addEvent(LookEvent);
    server.addEvent(MoveLookEvent);
}