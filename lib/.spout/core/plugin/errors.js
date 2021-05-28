"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPluginError = exports.createErrorText = void 0;
const createErrorText = (file, internal) => `An error occured while loading the${internal ? " internal" : ""} plugin ${file}. 
Please contact the spout developers!
Provided below is the error:
`.trim();
exports.createErrorText = createErrorText;
const createPluginError = (file, logs, e, internal) => {
    let errorText = exports.createErrorText(file, internal);
    logs.error(errorText);
    logs.error(e);
};
exports.createPluginError = createPluginError;
