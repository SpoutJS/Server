import SpoutServer from "../../../core/server";
import { LoginEvent } from "../worlds";

//Example plugin - won't be permanently kept

export const main = (server: SpoutServer<any>) => {
    server.on('login', (event: LoginEvent) => {
        const { player } = event;
        setInterval(() => {
            player.health--;
        }, 500);
        player._client.on('packet', data => {
            console.log(data);
        })
        player._client.on('respawn', data => { //doesn't work
            console.log(data);
        })
    });
}