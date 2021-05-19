import * as createChunkType from 'prismarine-chunk';
import { Vec3 } from 'vec3';
import { Client } from 'minecraft-protocol';
import Block from '../block';
import { Player } from '..';

const Chunk = createChunkType('1.16.4');

interface MapLocation {
    x: number;
    z: number;
}

type Generator = (location: MapLocation) => any;

export class MapSystem {
    generators: Map<string, Generator>;
    constructor() {
        this.generators = new Map();
    }
    generate(player: Player, size: number, generator: string = 'flat') {
        const generatorName = generator.toLowerCase();
        const gen = this.generators.get(generatorName);
        if (this.generators.has(generatorName)) {
            for (let x = size - size * 2; x < size * 2; x++) {
                for (let z = size - size * 2; z < size * 2; z++) {
                    this.writeChunk(
                        player,
                        gen({ x, z }),
                        { x, z }
                    );
                }
            }
        } else {
            throw new Error(`Could not find the generator at ${generatorName}`);
        }
    }
    register(name: string, generator: Generator) {
        if (this.generators.has(name.toLowerCase()))
            return console.error(
                '[SPOUT ERROR] Attempted to overwrite an existing map generator!'
            );
        this.generators.set(name.toLowerCase(), generator);
        console.log(
            `[SPOUT] Loaded Map Generator with name ${name.toLowerCase()}`
        );
    }
    writeChunk(player: Player, chunk: any, location: MapLocation) {
        player.sendPacket('map_chunk', {
            x: location.x,
            z: location.z,
            groundUp: true,
            biomes:
                chunk.dumpBiomes !== undefined
                    ? chunk.dumpBiomes()
                    : undefined,
            heightmaps: {
                type: 'compound',
                name: '',
                value: {
                    MOTION_BLOCKING: {
                        type: 'longArray',
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

const mapSystem = new MapSystem();

mapSystem.register('flat', loc => {
    const grass = new Block(8, 1);
    let chunk = new Chunk();
    for (let x = 0; x < 16; x++) {
        for (let z = 0; z < 16; z++) {
            grass.set(chunk, new Vec3(x, 60, z));
            for (let y = 0; y < 256; y++) {
                Block.setSkyLight(chunk, new Vec3(x, y, z));
            }
        }
    }
    return chunk;
});

export default mapSystem;
