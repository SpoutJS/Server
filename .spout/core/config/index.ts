import { promises, existsSync } from 'fs';
import { parse } from 'yaml';

import { readFile, writeFile } from 'fs/promises';

const main = async () => {
    if (!existsSync('./properties.yml')) {
        await writeFile(
            './properties.yml',
            await readFile('./.spout/core/config/default.yml')
        );
    }
    return await parse(await readFile('./properties.yml', 'utf-8'));
};

export default main;