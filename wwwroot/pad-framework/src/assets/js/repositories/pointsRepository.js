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
     * @param userId = to add the score to correct user
     * @returns {Promise<*>}
     */
    async set(score, userId){
        return this.#networkManager.doRequest(`${this.#route}/${userId}`, "POST", {score: score});
    }

    /**
     * Async function to get the score of the user
     * @param userId to get the score from the correct user
     * @returns {Promise<*>}
     */
    async get(userId){
        return this.#networkManager.doRequest(`${this.#route}/${userId}`, "GET");
    }
}