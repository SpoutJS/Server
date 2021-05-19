import SpoutServer from "../../../core/server";
import * as prisChunk from 'prismarine-chunk';
import * as mcData from 'minecraft-data';
import * as Vec from 'vec3';
import Event from "../../../core/events";
import MapSystem from "./map";

const Chunk = prisChunk('1.16.4');
const chunk = new Chunk();
const data = mcData('1.16');
const { loginPacket } = data as any;

const Vec3 = Vec as any;

for (let x = 0; x < 16; x++) {
    for (let z = 0; z < 16; z++) {
      chunk.setBlockType(new Vec3(x, 100, z), data.blocksByName.grass_block.id)
      chunk.setBlockData(new Vec3(x, 100, z), 1)
      for (let y = 0; y < 256; y++) {
        chunk.setSkyLight(new Vec3(x, y, z), 15)
      }
    }
  }

class LoginEvent extends Event<any> {
    static event = 'login';
    run() {
        let { client } = this.player;
        
        console.log(
            "[SPOUT DEBUG] Player connection occured! Username:",
            client.username,
            "UUID:",
            client.uuid
          );

        let opts = {
            hardcore: false,
            defaultgamemode: 'SURVIVAL',
            renderDistance: 15
        };

        let serverInstance = this.player.server.server;
    
        const packet = {
            entityId: client.uuid,
            isHardcore: opts.hardcore,
            gameMode: opts.defaultgamemode,
            previousGameMode: 255,
            worldNames: loginPacket.worldNames,
            dimensionCodec: loginPacket.dimensionCodec,
            dimension: loginPacket.dimension,
            worldName: "minecraft:overworld",
            hashedSeed: [0, 0],
            maxPlayers: serverInstance.maxPlayers,
            viewDistance: opts.renderDistance,
            reducedDebugInfo: false,
            enableRespawnScreen: true,
            isDebug: false,
            isFlat: false,
          };

          console.log(packet.dimensionCodec);

        client.write("login", packet);
    
        new MapSystem().generateMap(client, 10, null);
    
        client.write("position", {
          x: 0,
          y: 61,
          z: 0,
          yaw: 137,
          pitch: 0,
          flags: 0x00,
        });
    
        client.registerChannel("minecraft:brand", ["string", []]);
        client.writeChannel("minecraft:brand", Buffer.from("Spout").toString());

        console.log('Done!');
    }
}

export const inject = (server: SpoutServer<any>) => {
    server.addEvent(LoginEvent);
}