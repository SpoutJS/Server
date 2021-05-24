import { Event } from "../SpoutAPI";

export class TabComplete extends Event<any> {
    static event = "tab_complete";
    run(){
        console.log(this.data);
    }
}

export class DeclareCommands extends Event<any>{
    static event = "login";
    run(){
        this.player.sendPacket("declare_commands", {
            
        })
    }
}