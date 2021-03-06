import config from "./core/config";
import eula from "./core/eula";
import { loadInternalPlugins } from "./core/plugin/loader";
import SpoutServer, {Config} from "./core/server";
// @ts-ignore
import * as json from '../package.json';
import logger from './utils/logger';

import { Promise } from 'bluebird';

const args = process.argv.slice(2);
const opts = args
    .filter(i => i.startsWith('--'))
    .map(i => i.slice(2).toLowerCase());

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

const spout = logger.create('Spout');
const core = logger.create('Core');
const plugins = spout.create('Plugins');

const main = async () => {
    const mode = (opts.includes('dev') || opts.includes('development')) ? 'dev' : 'production';
    if (mode === 'dev') {
        Promise.longStackTraces();
        (global as any).Promise = Promise;
    }
    for (const line of lines) {
        core.info(line);
        await sleep(125);
    }
    await eula();
    const configuration: Config = await config();
    const server = SpoutServer.create({
        motd: configuration.spout.motd,
        port: configuration.spout.port,
        "online-mode": true,
        version: "1.16.4",
        maxPlayers: configuration.spout.maxPlayers,
    }, configuration);
    plugins.info('Loading...');
    await loadInternalPlugins(server);
};

main();

process.on('unhandledRejection', reason => {
    spout.create('Unhandled Errors').error(reason);
});