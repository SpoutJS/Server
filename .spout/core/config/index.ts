import { promises, existsSync } from 'fs';
import { parse } from 'yaml';

import { readFile, writeFile } from 'fs/promises';

import logger from '../../utils/logger';

import { Config } from "../server";

const spout = logger.create('Spout');
const logs = logger.create('Config');

const main = async () => {
    logs.info("Loading config!")
    if (!existsSync('./server/config.yml')) {
        logs.warn("No config file found! Creating one.")
        await writeFile(
            './server/config.yml',
            await readFile('./.spout/core/config/default.yml')
        );
    }
    logs.info("Config loaded!")
    const config: Config = await parse(await readFile('./server/config.yml', 'utf-8'));
    logs.debug(config as any);
    return config;
};

export default main;