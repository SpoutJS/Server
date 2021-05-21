import { Player } from "../";

interface CommandData {
    command: string,
    description: string,
    aliases: string[],
    run: (player: Player, args?: string[]) => any;
}
const commands = new Map<string, CommandData>();

export default class Command{
    constructor(cmdData?: CommandData){
        if (cmdData) {
            if (commands.has(cmdData.command.toLowerCase())) {
                console.log(`[SPOUT ERROR] Attempted command register of existing command ${cmdData.command}!`);
                return;
            } else {
                commands.set(cmdData.command.toLowerCase(), cmdData);
                if(cmdData.aliases){
                    for(let command of cmdData.aliases){
                        if (commands.has(command.toLowerCase())){
                            console.log(`[SPOUT ERROR] Attempted command register of exsisting command ${command}!`);
                        } else {
                            commands.set(command.toLowerCase(), cmdData);
                        }
                    }
                }
            }
        }
    }
    getCommand(command: string): CommandData['run']{
        if(commands.has(command.toLowerCase())){
            return commands.get(command.toLowerCase()).run;
        }
    }
    isCommand(command: string): boolean{
        return commands.has(command.toLowerCase());
    }
    getCommandData(command: string): CommandData{
        return commands.get(command.toLowerCase());
    }
}