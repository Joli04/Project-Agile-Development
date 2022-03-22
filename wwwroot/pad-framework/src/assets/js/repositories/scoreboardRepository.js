import {NetworkManager} from "../framework/utils/networkManager.js";

export class ScoreboardRepository{
    #route
    #networkManeger

    constructor() {
        this.#route = "/scoreboard"
        this.#networkManeger = new NetworkManager();
    }

    async getALL(){

    }

    async get(scoreboard){
        console.log(this.#route)
        return await this.#networkManeger.doRequest(`${this.#route}`, "GET")
    }
}
