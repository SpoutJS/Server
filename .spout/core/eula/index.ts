import { promises, existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';

const getDateStr = () => new Date().toUTCString();

const eulaMessage = `# Generated by Spout
# By changing the setting below to TRUE you are indicating your agreement to mojang's EULA (https://account.mojang.com/documents/minecraft_eula).
# Generated on ${getDateStr()};
eula=false`;

const eula = async () => {
    console.log("[SPOUT] Checking EULA...")
    if (!existsSync('./server/eula.txt')) {
        await writeFile('./server/eula.txt', eulaMessage);
        console.log("[SPOUT] No EULA file found! Creating one.")
    }
    const eulaText = (await readFile('./server/eula.txt'))
        .toString()
        .split(' ')
        .join('');
    if (!(eulaText.toLowerCase().includes('eula=true'))) {
        console.error(
            '[SPOUT] EULA has not been accepted yet! Please accept the eula before continuing!'
        );
        process.exit(1);
    }
    console.log('[SPOUT] EULA Loaded!');
};


export default eula;