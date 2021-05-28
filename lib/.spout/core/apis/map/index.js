"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapSystem = void 0;
const createChunkType = require("prismarine-chunk");
const vec3_1 = require("vec3");
const block_1 = require("../block");
const logger_1 = require("../../../utils/logger");
const logs = logger_1.default.create('Spout').create('World Generation');
const Chunk = createChunkType("1.16.4");
class MapSystem {
    constructor() {
        this.generators = new Map();
    }
    generate(player, size, generator = "flat") {
        const generatorName = generator.toLowerCase();
        const gen = this.generators.get(generatorName);
        if (this.generators.has(generatorName)) {
            for (let x = size - size * 2; x < size * 2; x++) {
                for (let z = size - size * 2; z < size * 2; z++) {
                    this.writeChunk(player, gen({ x, z }), { x, z });
                }
            }
        }
        else {
            throw new Error(`Could not find the generator at ${generatorName}`);
        }
    }
    register(name, generator) {
        if (this.generators.has(name.toLowerCase()))
            logs.error('Attempted to overwrite an existing map generator!');
        this.generators.set(name.toLowerCase(), generator);
        logger_1.default.info(`Loaded Map Generator with name ${name.toLowerCase()}`);
    }
    writeChunk(player, chunk, location) {
        player.sendPacket("map_chunk", {
            x: location.x,
            z: location.z,
            groundUp: true,
            biomes: chunk.dumpBiomes !== undefined ? chunk.dumpBiomes() : undefined,
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
exports.MapSystem = MapSystem;
const mapSystem = new MapSystem();
mapSystem.register("flat", (loc) => {
    const grass = new block_1.default(8, 1);
    let chunk = new Chunk();
    for (let x = 0; x < 16; x++) {
        for (let z = 0; z < 16; z++) {
            grass.set(chunk, new vec3_1.Vec3(x, 60, z));
            for (let y = 0; y < 256; y++) {
                block_1.default.setSkyLight(chunk, new vec3_1.Vec3(x, y, z));
                chunk.setBiome("Superflat", new vec3_1.Vec3(x, y, z));
            }
        }
    }
    return chunk;
});
exports.default = mapSystem;
