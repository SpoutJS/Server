import { SpoutServer, Command, Player } from "../SpoutAPI";

export const main = (server: SpoutServer<any>) =>{
    new Command({
        "command":"ver",
        "aliases":["version", "spoutver", "spoutversion"],
        description:"Spout version info",
        run: (player: Player) =>{
            player.sendMessage("&7&l------------------------");
            player.sendMessage("&7Running Spout version "+server.version);
            player.sendMessage("&7");
            player.sendMessage("&7Created by: "+server.developers.join(", "))
            player.sendMessage("&7&l------------------------");
        }
    })
}   