import {NetworkManager} from "../framework/utils/networkManager.js";

export class ScoreboardRepository{
    #route
    #networkManager

    constructor() {
        this.#route = "/scoreboard"
        this.#networkManager = new NetworkManager();
    }

    async get(place){
        return await this.#networkManager.doRequest(`${this.#route}/${place}`, "GET")
    }
}
