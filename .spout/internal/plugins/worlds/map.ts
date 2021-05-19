const block = require("./block");
const vec3 = require("vec3");
const Chunk = require("prismarine-chunk")("1.16.4");
var mapGens = new Map();

export default class MapSystem {
  constructor() {}
  generateMap(client, size, generator) {
    if (!generator) generator = "flat";
    if (!mapGens.has(generator.toLowerCase()))
      throw new Error("[SPOUT ERROR] An invalid map generator was called!");
    for (let x = size - size * 2; x < size * 2; x++) {
      for (let z = size - size * 2; z < size * 2; z++) {
        loadChunk(
          client,
          mapGens.get(generator.toLowerCase())({ x: x, z: z }),
          { x: x, z: z }
        );
      }
    }
  }
  loadGenPlugin(name, func) {
    if (mapGens.has(name.toLowerCase()))
      throw new Error(
        "[SPOUT ERROR] Attempted load of an exsisting Map generator!"
      );
    else {
      mapGens.set(name.toLowerCase(), func);
      console.log("[SPOUT] Loaded map generator " + name);
    }
  }
}

function loadChunk(client, chunk, location) {
  client.write("map_chunk", {
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

(async function () {
  new MapSystem().loadGenPlugin("flat", function (location) {
    let chunk = new Chunk();
    for (let x = 0; x < 16; x++) {
      for (let z = 0; z < 16; z++) {
        block.setBlock(chunk, new vec3(x, 60, z), new block.Block(8, 1));
        block.setBlock(chunk, new vec3(x, 59, z), new block.Block(9));
        block.setBlock(chunk, new vec3(x, 58, z), new block.Block(9));
        block.setBlock(chunk, new vec3(x, 57, z), new block.Block(9));
        block.setBlock(chunk, new vec3(x, 56, z), new block.Block(25));
        for (let y = 0; y < 256; y++) {
          block.setSkyLight(chunk, new vec3(x, y, z));
        }
      }
    }
    return chunk;
  });
})();