import {NetworkManager} from "../framework/utils/networkManager.js";

export class user_transportRepository{
    #route;
    #networkManager;

    constructor() {
        this.#route = "/user_transport1"
        this.#networkManager = new NetworkManager();
    }

    /**
     * get request for all data from user_transport1
     * @returns {Promise<*>}
     */
    async updateFrequency(userId, vehicleType, frequency){
        return this.#networkManager.doRequest(`${this.#route}/${userId}/${vehicleType}/${frequency}`, "PUT");
    }

    /**
     * get request for all data from user_transport1
     * @returns {Promise<*>}
     */
    async getUserTransport(){
        return this.#networkManager.doRequest(`${this.#route}`, "GET");
    }

    /**
     * update user_transport1, insert values
     * @param userId session manager
     * @returns {Promise<*>}
     */
    async updateUserTransport(userId){
        return await this.#networkManager.doRequest(`${this.#route}/${userId}`, "PUT");
    }

    async getVehicleFrequency(userId, vehicleType){
        return await this.#networkManager.doRequest(`${this.#route}/${userId}/${vehicleType}`, "GET");
    }
}