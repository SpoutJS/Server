import { readdir, readFile } from 'fs/promises';
import { statSync } from 'fs';
import { createPluginError } from './errors';
import SpoutServer from '../server';

// .spout/core/plugins
// ../../internal/plugins

const listInternalFiles = (dir = './.spout/internal/plugins') => readdir(dir)
    .then(i => i.map(file => file))

const isDir = (file: string, dir = './.spout/internal/plugins') => statSync(`${dir}/${file}`).isDirectory();

const listInternalPlugins = () => listInternalFiles().then(files => files.filter(i => isDir(i)));

export const loadPlugin = async (file: string, server: SpoutServer<any>, isInternal: boolean) => {
    console.log(`- Found an${isInternal ? ' internal' : ''} plugin at ${JSON.stringify(file)}`);
    console.log(`     > Attempting to load plugin`)
    let config;
    try {
        const text = await readFile(`./.spout/internal/plugins/${file}/config.json`, "utf-8");
        config = JSON.parse(text);
        console.log(`     > Gathered config successfully`);
    } catch {
        config = {};
        console.log(`     > No config found. Perhaps you should make one?`)
    }
    try {
        const plugin = require(`../../internal/plugins/${file}`);
        if (plugin?.main) {
            const res = plugin.main(config);
            console.log(`     > Ran the plugin's main code`);
            if (res?.inject) {
                res.inject(server);
                console.log(`     > Injected plugin`);
            }
        }
        if (plugin?.inject) {
            plugin.inject(server);
            console.log(`     > Injected plugin`);
        }
    } catch (err) {
        createPluginError(`../../internal/plugins/${file}`, err, isInternal);
    }
}

export const loadInternalPlugins = async (server: SpoutServer<any>) => {
    for (const file of await listInternalPlugins()) {
        await loadPlugin(file, server, true);
    }
};