import { Vec3 } from "vec3";

export default class Block {
    constructor(public id?: number, public data?: number) {}
    set(chunk: any, location: Vec3) {
        chunk.setBlockType(location, this.id);
        if (this.data != null) {
            chunk.setBlockData(location, this.data);
        }
    }
    static setSkyLight(chunk: any, location: Vec3, value: number = 15) {
        if (value > 15 || value < 0) {
            console.log(
                `[SPOUT ERROR] Invalid Skylight value provided! Expected: 0-15, Got:${value}`
            );
            value = 15;
        }
        chunk.setSkyLight(location, value);
    }
}
