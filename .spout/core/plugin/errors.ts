export const createErrorText = (file: string, e: Error, internal: boolean) => `[SPOUT CRITICAL ERROR] An error occured while loading the${internal ? " internal" : ""} plugin ${file}. 
Please contact the spout developers!
Provided below is the error:
${e.toString()}
`.trim();

export const createPluginError = (file: string, e: Error, internal: boolean) => {
    let errorText = createErrorText(file, e, internal);
    console.error(errorText);
};
