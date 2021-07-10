import { Player } from '../';
import { parsers } from './parsers';

interface CommandData {
<<<<<<< HEAD
    command: string,
    description: string,
    aliases: string[],
    example?: string,
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
                if(!cmdData.example) cmdData.example = "/"+cmdData.command;
                cmdData.example.replace(/%command%/gi, cmdData.command);
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
    get commands(): Map<string, CommandData>{
        return commands;
    }
}
=======
	command: string;
	description: string;
	aliases: string[];
	run: (player: Player, args?: string[]) => any;
}
const commands = new Map<string, CommandData>();

export default class Command {
	constructor(cmdData?: CommandData) {
		if (cmdData) {
			if (commands.has(cmdData.command.toLowerCase())) {
				console.log(
					`[SPOUT ERROR] Attempted command register of existing command ${cmdData.command}!`
				);
				return;
			} else {
				commands.set(cmdData.command.toLowerCase(), cmdData);
				if (cmdData.aliases) {
					for (let command of cmdData.aliases) {
						if (commands.has(command.toLowerCase())) {
							console.log(
								`[SPOUT ERROR] Attempted command register of exsisting command ${command}!`
							);
						} else {
							commands.set(command.toLowerCase(), cmdData);
						}
					}
				}
			}
		}
	}
	getCommand(command: string): CommandData['run'] {
		if (commands.has(command.toLowerCase())) {
			return commands.get(command.toLowerCase()).run;
		}
	}
	isCommand(command: string): boolean {
		return commands.has(command.toLowerCase());
	}
	getCommandData(command: string): CommandData {
		return commands.get(command.toLowerCase());
	}
	get commands() {
		return commands;
	}
	get commandData() {
		let CmdData = [];

		commands.forEach((value, key) => {
			CmdData.push({
				type: 'literal',
				name: key,
				executable: true,
				redirects: [],
				children: [],
			});
		});

		return JSON.stringify({
			root: {
				type: 'root',
				name: 'root',
				executable: false,
				redirects: [],
				children: CmdData,
			},
			parsers: parsers,
		});
	}
}
>>>>>>> 8953cf528ba8224cede1575015fbc45698e12c3a
