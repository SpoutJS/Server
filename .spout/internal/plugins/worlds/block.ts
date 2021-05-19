/**
 *
 * @param {*} chunk
 * @param {import("vec3").Vec3} location
 * @param {Block} block
 */
 function setBlock(chunk, location, block) {
    chunk.setBlockType(location, block.id);
    chunk.setBlockData(location, block.data);
  }
  
  /**
   *
   * @param {*} chunk
   * @param {import("vec3").Vec3} location
   * @param {number} value
   */
  async function setSkyLight(chunk, location, value) {
    if (!value) value = 15;
    if (value < 0 || value > 15) {
      console.warn(
        "[SPOUT CRITICAL] Invalid Skylight value provided! Expected: 0-15, Got:",
        value
      );
      value = 15;
    }
    chunk.setSkyLight(location, value);
  }
  
  class Block {
    /**
     *
     * @param {number} blockid
     * @param {number} blockdata
     * @returns
     */
    constructor(blockid, blockdata) {
      if (blockid)
        return {
          id: blockid,
          data: blockdata || 0,
        };
    }
  }
  
export = {
    setBlock,
    setSkyLight,
    Block,
  };