import {NetworkManager} from "../framework/utils/networkManager.js";

export class ScoreboardRepository {
    #route
    #networkManager

    constructor() {
        this.#route = "/scoreboard"
        this.#networkManager = new NetworkManager();
    }

    //Does a request and gives the value place
    async get(place, scoreType) {
        return await this.#networkManager.doRequest(`${this.#route}/${place}/${scoreType}`, "GET")
    }

    async getBadges(userid){
        return await this.#networkManager.doRequest(`${this.#route}/${userid}/badges`, "GET")
    }
}
