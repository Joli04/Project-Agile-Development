import {NetworkManager} from "../framework/utils/networkManager.js";

export class ScoreboardRepository{
    #route
    #networmManeger

    constructor() {
        this.#route = "/scoreboard"
        this.#networmManeger = new NetworkManager();
    }

    async getALL(){

    }

    async get(scoreboard){
        console.log(this.#route)
        return await this.#networmManeger.doRequest(`${this.#route}`, "GET")
    }

}