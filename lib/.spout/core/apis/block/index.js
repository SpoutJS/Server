"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Block {
    constructor(id, data) {
        this.id = id;
        this.data = data;
    }
    set(chunk, location) {
        chunk.setBlockType(location, this.id);
        if (this.data != null) {
            chunk.setBlockData(location, this.data);
        }
    }
    static setSkyLight(chunk, location, value = 15) {
        if (value > 15 || value < 0) {
            console.log(`[SPOUT ERROR] Invalid Skylight value provided! Expected: 0-15, Got:${value}`);
            value = 15;
        }
        chunk.setSkyLight(location, value);
    }
}
exports.default = Block;
