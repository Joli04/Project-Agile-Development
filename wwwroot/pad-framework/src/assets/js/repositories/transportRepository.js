import {NetworkManager} from "../framework/utils/networkManager.js";

export class TransportRepository {
    #route
    #networkManager

    constructor() {
        this.#route = "/transport"
        this.#networkManager = new NetworkManager();
    }


    /**
     * Get request.
     * @returns {Promise<*>}
     */
    async get(){
        console.log(this.#route)
        return await this.#networkManager.doRequest(`${this.#route}`, "GET");
    }

    async setFrequency(userId){
        return await this.#networkManager.doRequest(`${this.#route}/${userId}`, "GET");
    }
}
