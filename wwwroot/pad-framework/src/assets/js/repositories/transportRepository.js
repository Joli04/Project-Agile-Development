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
        return await this.#networkManager.doRequest(`${this.#route}`, "GET");
    }

    async setFirstLogin(userId, is_first_login){
        return await this.#networkManager.doRequest(`${this.#route}/is_first_login/${userId}`, "PUT", {"is_first_login": is_first_login});
    }
}
