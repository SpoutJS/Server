import Logger from "that-logger/src";

export const createErrorText = (file: string, internal: boolean) => `An error occured while loading the${internal ? " internal" : ""} plugin ${file}. 
Please contact the spout developers!
Provided below is the error:
`.trim();

export const createPluginError = (file: string, logs: Logger, e: Error, internal: boolean) => {
    let errorText = createErrorText(file, internal);
    logs.error(errorText);
    logs.error(e);
};
