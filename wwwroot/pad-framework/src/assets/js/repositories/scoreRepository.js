import {NetworkManager} from "../framework/utils/networkManager.js";

export class scoreRepository {
    #route
    #networkManager

    constructor() {
        this.#route = "/score"
        this.#networkManager = new NetworkManager();
    }

    async getAll() {

    }

    async get() {
        console.log(this.#route)
        return await this.#networkManager.doRequest(`${this.#route}`,"GET")
    }

}
