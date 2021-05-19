import { Vec3 } from "vec3";

export default class Block {
    constructor(public id?: number, public data?: number) {}
    setBlock(Chunk: any, location: Vec3, block: Block) {
        Chunk.setBlockType(location, block.id);
        Chunk.setBlockData(location, block.data);
    }
    setSkyLight(Chunk: any, location: Vec3, value: number = 15) {
        if (value > 15 || value < 0) {
            console.log(
                `[SPOUT ERROR] Invalid Skylight value provided! Expected: 0-15, Got:${value}`
            );
            value = 15;
        }
        Chunk.setSkyLight(location, value);
    }
}
