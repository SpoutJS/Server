import { readdir, readFile } from 'fs/promises';
import { statSync } from 'fs';
import { createPluginError } from './errors';
import SpoutServer from '../server';
import * as path from 'path';

import logger from '../../utils/logger';

// .spout/core/plugins
// ../../internal/plugins

const capitalize = (text: string) => `${text[0].toUpperCase()}${text.slice(1)}`;

const listInternalFiles = (dir = './.spout/internal/plugins') => readdir(dir)
    .then(i => i.map(file => file))

const isDir = (file: string, dir = './.spout/internal/plugins') => statSync(`${dir}/${file}`).isDirectory();

const listInternalPlugins = () => listInternalFiles().then(files => files.filter(i => isDir(i)));

const spout = logger.create('Spout');
const plugins = spout.create('Plugins');
const internal = plugins.create('Internal');
const publicLogs = plugins.create('Public');

interface Config {
    name?: string;
    author?: string;
    description?: string;
}

interface PluginData {
    internal: boolean;
    baseName: string;
    config: Config;
}

export const loadPlugin = async (file: string, server: SpoutServer<any>, isInternal: boolean) => {
    let name = capitalize(path.basename(file));
    const logs = (isInternal ? internal : publicLogs).create(name);
    logs.info(`Found an${isInternal ? ' internal' : ''} plugin at ${JSON.stringify(file)}`);
    logs.info(`Attempting to load...`)
    let config;
    try {
        const text = await readFile(`./.spout/internal/plugins/${file}/config.json`, "utf-8");
        config = JSON.parse(text);
        logs.info('Gathered config successfully');
    } catch {
        config = {};
        logs.warn('No config found. Perhaps you should make one?');
    }
    pluginList.push({
        internal: isInternal,
        baseName: name,
        config
    });
    try {
        const plugin = require(`../../internal/plugins/${file}`);
        if (plugin?.main) {
            const res = plugin.main(server, config);
            logs.info(`Ran the plugin's main code`);
        }
    } catch (err) {
        createPluginError(`../../internal/plugins/${file}`, logs, err, isInternal);
    }
}

export const loadInternalPlugins = async (server: SpoutServer<any>) => {
    for (const file of await listInternalPlugins()) {
        await loadPlugin(file, server, true);
    }
};

export const pluginList: PluginData[] = [];