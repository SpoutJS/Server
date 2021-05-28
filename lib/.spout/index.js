"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./core/config");
const eula_1 = require("./core/eula");
const loader_1 = require("./core/plugin/loader");
const server_1 = require("./core/server");
// @ts-ignore
const json = require("../package.json");
const logger_1 = require("./utils/logger");
const bluebird_1 = require("bluebird");
const args = process.argv.slice(2);
const opts = args
    .filter(i => i.startsWith('--'))
    .map(i => i.slice(2).toLowerCase());
const sleep = (time) => new bluebird_1.Promise((res) => setTimeout(res, time));
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
const spout = logger_1.default.create('Spout');
const core = logger_1.default.create('Core');
const plugins = spout.create('Plugins');
const main = async () => {
    const mode = (opts.includes('dev') || opts.includes('development')) ? 'dev' : 'production';
    if (mode === 'dev') {
        bluebird_1.Promise.longStackTraces();
        global.Promise = bluebird_1.Promise;
    }
    for (const line of lines) {
        core.info(line);
        await sleep(125);
    }
    await eula_1.default();
    const configuration = await config_1.default();
    const server = server_1.default.create({
        motd: configuration.spout.motd,
        port: configuration.spout.port,
        "online-mode": true,
        version: "1.16.4",
        maxPlayers: configuration.spout.maxPlayers,
    }, configuration);
    plugins.info('Loading...');
    await loader_1.loadInternalPlugins(server);
};
main();
process.on('unhandledRejection', reason => {
    spout.create('Unhandled Errors').error(reason);
});
