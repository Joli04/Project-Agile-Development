import {NetworkManager} from "../framework/utils/networkManager.js";

export class PointsRepository{
    #route;
    #networkManager;

    constructor() {
        this.#route = "/points"
        this.#networkManager = new NetworkManager();
    }

    /**
     * Async function to update the score of the user
     * @param score = the users new score
     * @param vehicleType
     * @param frequency
     * @param userId = to add the score to correct user
     * @returns {Promise<*>}
     */
    async set(score, vehicleType, frequency, userId){
        return this.#networkManager.doRequest(`${this.#route}/${userId}`, "POST", {score: score, frequency: frequency, vehicleType: vehicleType});
    }

    /**
     * Async function to get the score of the user
     * @param userId to get the score from the correct user
     * @param vehicleType
     * @returns {Promise<*>}
     */
    async get(userId, vehicleType){
        return this.#networkManager.doRequest(`${this.#route}/${userId}/${vehicleType}`, "GET");
    }
}

