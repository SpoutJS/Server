import config from "./core/config";
import eula from './core/eula';
import pluginLoader from "./core/plugin"

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
Checking EULA...
`;

const main = async () => {
    console.log(text);
    await eula();
    await config();
    await pluginLoader();
};
main();
