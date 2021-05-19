import { promises, existsSync } from 'fs';
import { parse } from 'yaml';

import { readFile, writeFile } from 'fs/promises';

const main = async () => {
    console.log("[SPOUT] Loading config!")
    if (!existsSync('./properties.yml')) {
        console.log("[SPOUT] No config file found! Creating one.")
        await writeFile(
            './properties.yml',
            await readFile('./.spout/core/config/default.yml')
        );
    }
    console.log("[SPOUT] Config loaded!")
    return await parse(await readFile('./properties.yml', 'utf-8'));
};

export default main;