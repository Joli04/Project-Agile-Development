import {NetworkManager} from "../framework/utils/networkManager.js";

export class ScoreboardRepository{
    #route
    #networkManager

    constructor() {
        this.#route = "/scoreboard"
        this.#networkManager = new NetworkManager();
    }

    async getALL(){

    }

    async get(scoreboard){
        console.log(this.#route)
        return await this.#networkManager.doRequest(`${this.#route}`, "GET")
    }
}
