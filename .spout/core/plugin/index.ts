import { readFile, writeFile, stat, mkdir } from "fs/promises";
import { existsSync, fstat, readdir } from "fs";

const createErrorText = (file: string, e: Error, internal: boolean) => `[SPOUT CRITICAL ERROR] An error occured while loading the ${internal ? " internal" : ""} plugin ${file}. 
Please contact the spout developers!
Provided below is the error:
${e.toString()}
`.trim();

const createPluginError = (file: string, e: Error, internal: boolean) => {
    let errorText = createErrorText(file, e, internal);
    console.error(errorText);
};

const pluginLoader = async () => {
    console.log("[SPOUT] Loading plugins")
    if(!existsSync("./plugins")) await mkdir('./plugins');

    readdir(
        "./.spout/core/plugins",
        async (err: NodeJS.ErrnoException, files: string[]) => {
            if (err) {
                console.error(
                    `
[SPOUT CRITICAL ERROR] An error occured while loading the internal plugin loader! Please report this to the developers immediately.
${err.toString()}         
`.trim()
                );
                console.error(err);
                return;
            }
            files.filter(
                async (file) =>
                    !(await stat(`./.spout/core/plugins/${file}`)).isDirectory()
            );
            files.forEach(async (file) => {
                try {
                    require("./.spout/core/plugins/" + file);
                } catch (e) {
                    createPluginError(file, e, true);
                }
            });
            console.log(`[SPOUT] Loaded ${files.length} internal plugins!`);
        }
    );

    readdir(
        "./plugins",
        async (err: NodeJS.ErrnoException, files: string[]) => {
            if (err) {
                console.error(
                    `
[SPOUT CRITICAL ERROR] An error occured while loading the internal plugin loader! Please report this to the developers immediately.
${err.toString()}         
`.trim()
                );
                console.error(err);
                return;
            }
            files.filter(
                async (file) =>
                    !(await stat(`./.spout/core/plugins/${file}`)).isDirectory()
            );
            files.forEach(async (file) => {
                try {
                    require(`./.spout/core/plugins/${file}`);
                } catch (e) {
                    createPluginError(file, e, true);
                }
            });
            console.log(`[SPOUT] Loaded ${files.length} internal plugins!`);
        }
    );
    console.log("[SPOUT] Loaded plugins")
};

export default pluginLoader;
