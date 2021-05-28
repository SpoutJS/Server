"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadInternalPlugins = exports.loadPlugin = void 0;
const promises_1 = require("fs/promises");
const fs_1 = require("fs");
const errors_1 = require("./errors");
const path = require("path");
const logger_1 = require("../../utils/logger");
// .spout/core/plugins
// ../../internal/plugins
const capitalize = (text) => `${text[0].toUpperCase()}${text.slice(1)}`;
const listInternalFiles = (dir = './.spout/internal/plugins') => promises_1.readdir(dir)
    .then(i => i.map(file => file));
const isDir = (file, dir = './.spout/internal/plugins') => fs_1.statSync(`${dir}/${file}`).isDirectory();
const listInternalPlugins = () => listInternalFiles().then(files => files.filter(i => isDir(i)));
const spout = logger_1.default.create('Spout');
const plugins = spout.create('Plugins');
const internal = plugins.create('Internal');
const publicLogs = plugins.create('Public');
const loadPlugin = async (file, server, isInternal) => {
    let name = capitalize(path.basename(file));
    const logs = (isInternal ? internal : publicLogs).create(name);
    logs.info(`Found an${isInternal ? ' internal' : ''} plugin at ${JSON.stringify(file)}`);
    logs.info(`Attempting to load...`);
    let config;
    try {
        const text = await promises_1.readFile(`./.spout/internal/plugins/${file}/config.json`, "utf-8");
        config = JSON.parse(text);
        logs.info('Gathered config successfully');
    }
    catch {
        config = {};
        logs.warn('No config found. Perhaps you should make one?');
    }
    try {
        const plugin = require(`../../internal/plugins/${file}`);
        if (plugin?.main) {
            const res = plugin.main(server, config);
            logs.info(`Ran the plugin's main code`);
        }
    }
    catch (err) {
        errors_1.createPluginError(`../../internal/plugins/${file}`, logs, err, isInternal);
    }
};
exports.loadPlugin = loadPlugin;
const loadInternalPlugins = async (server) => {
    for (const file of await listInternalPlugins()) {
        await exports.loadPlugin(file, server, true);
    }
};
exports.loadInternalPlugins = loadInternalPlugins;
