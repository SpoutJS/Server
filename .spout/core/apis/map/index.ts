import Chunk from "prismarine-chunk";
import Vec3 from "vec3";
import { Client } from "minecraft-protocol";

const mapGenerators = new Map<string, CallableFunction>();

interface mapLocation {
    x: number;
    z: number;
}

export default class MapSystem {
    constructor() {}
    generateMap(client: Client, size: number, generator: string = "flat") {
        if (!mapGenerators.has(generator.toLowerCase())) {
            for (let x = size - size * 2; x < size * 2; x++) {
                for (let z = size - size * 2; z < size * 2; z++) {
                    this.writeChunk(
                        client,
                        mapGenerators.get(generator.toLowerCase())({
                            x: x,
                            z: z,
                        }),
                        { x: x, z: z }
                    );
                }
            }
        }
    }
    registerGenerator(name: string, generator: CallableFunction) {
        if (mapGenerators.has(name.toLowerCase()))
            return console.log(
                "[SPOUT ERROR] Attempted load of an exsisting map generator!"
            );
        mapGenerators.set(name.toLowerCase(), generator);
        console.log(
            `[SPOUT] Loaded Map Generator with name ${name.toLowerCase()}`
        );
    }
    writeChunk(client: Client, chunk: any, location: mapLocation) {
        client.write("map_chunk", {
            x: location.x,
            z: location.z,
            groundUp: true,
            bioemes:
                chunk.dumpBioymes !== undefined
                    ? chunk.dumpBiomes()
                    : undefined,
            heightmaps: {
                type: "compound",
                name: "",
                value: {
                    MOTION_BLOCKING: {
                        type: "longArray",
                        value: new Array(36).fill([0, 0]),
                    },
                },
            },
            bitMap: chunk.getMask(),
            chunkData: chunk.dump(),
            blockEntities: [],
        });
    }
}
