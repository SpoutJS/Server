"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const yaml_1 = require("yaml");
const promises_1 = require("fs/promises");
const logger_1 = require("../../utils/logger");
const spout = logger_1.default.create('Spout');
const logs = logger_1.default.create('Config');
const main = async () => {
    logs.info("Loading config!");
    if (!fs_1.existsSync('./server/config.yml')) {
        logs.warn("No config file found! Creating one.");
        await promises_1.writeFile('./server/config.yml', await promises_1.readFile('./.spout/core/config/default.yml'));
    }
    logs.info("Config loaded!");
    const config = await yaml_1.parse(await promises_1.readFile('./server/config.yml', 'utf-8'));
    logs.debug(config);
    return config;
};
exports.default = main;
