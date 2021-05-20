import { Player } from "../";

interface CommandData {
    command: string,
    description: string,
    aliases: string[],
    run: (player: Player, args: string[]) => any;
}

export default class Command {
    commands: Map<string, CommandData>;
    constructor(cmdData?: CommandData){
        this.commands = new Map();
        if (cmdData) {
            if (this.commands.has(cmdData.command.toLowerCase())) {
                console.log(`[SPOUT ERROR] Attempted command register of existing command ${cmdData.command}!`);
                return;
            } else {
                this.commands.set(cmdData.command.toLowerCase(), cmdData);
                if(cmdData.aliases){
                    for(let command of cmdData.aliases){
                        if (this.commands.has(command.toLowerCase())){
                            console.log(`[SPOUT ERROR] Attempted command register of exsisting command ${command}!`);
                        } else {
                            this.commands.set(command.toLowerCase(), cmdData);
                        }
                    }
                }
            }
        }
    }
    getCommand(command: string){
        if(this.commands.has(command.toLowerCase())){
            return this.commands.get(command.toLowerCase()).run;
        }
    }
    isCommand(command: string){
        return this.commands.has(command.toLowerCase());
    }
    getCommandData(command: string){
        return this.commands.get(command.toLowerCase());
    }
}