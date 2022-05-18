import {NetworkManager} from "../framework/utils/networkManager.js";

export class PrizeRepository {
    #route
    #networkManager

    constructor() {
        this.#route = "/prize"
        this.#networkManager = new NetworkManager();
    }

    /**
     * Get request
     * @returns {Promise<*>}
     */
    async get(){
        console.log(this.#route)
        return await this.#networkManager.doRequest(`${this.#route}`, "GET");
    }
}
