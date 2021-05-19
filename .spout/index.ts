import config from "./core/config";
import eula from "./core/eula";
import { loadInternalPlugins } from "./core/plugin/loader";
import SpoutServer from "./core/server";
// @ts-ignore
import * as json from '../package.json';

const sleep = (time: number) => new Promise((res) => setTimeout(res, time));

const spoutConfig = {
    version: json.version
};

const text = `
┏━━━┓━━━━━━━━━━━━━┏┓━
┃┏━┓┃━━━━━━━━━━━━┏┛┗┓
┃┗━━┓┏━━┓┏━━┓┏┓┏┓┗┓┏┛
┗━━┓┃┃┏┓┃┃┏┓┃┃┃┃┃━┃┃━
┃┗━┛┃┃┗┛┃┃┗┛┃┃┗┛┃━┃┗┓
┗━━━┛┃┏━┛┗━━┛┗━━┛━┗━┛
━━━━━┃┃━━━━━━━━━━━━━━
━━━━━┗┛━━━━━━━━━━━━━━

Spout Minecraft Server

Developers: Blocks_n_more, Corman
Spout Version: ${spoutConfig.version}

Github: https://github.com/spoutjs/Server

Report issues to https://github.com/spoutjs/Server/issues

Join our discord to chat about Spout or suggest ideas!

https://dsc.gg/spout
`;

const lines = text.split("\n");

const main = async () => {
    for (const line of lines) {
        console.log(line);
        await sleep(250);
    }
    await eula();
    let configuration = await config()
    const server = SpoutServer.create({
        motd: configuration.spout.motd,
        port: configuration.spout.port,
        "online-mode": true,
        version: "1.16.4",
        maxPlayers: configuration.spout.maxplayers,
    });
    console.log('[SPOUT] Loading plugins...');
    await loadInternalPlugins();
};

main();
