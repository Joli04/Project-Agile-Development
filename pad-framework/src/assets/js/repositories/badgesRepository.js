import {NetworkManager} from "../framework/utils/networkManager.js";

export class BadgesRepository{
    #route;
    #routeUser;
    #networkManager;

    constructor() {
        this.#route = "/badges"
        this.#routeUser = "/user"
        this.#networkManager = new NetworkManager();
    }

    /***
     * Async funtion that gets the data of the badges
     * @param userId
     * @returns {Promise<*>}
     */
    async get(userId){
        return this.#networkManager.doRequest(`${this.#route}/${userId}`, "GET");
    }

    async getUser(userId){
        return this.#networkManager.doRequest(`${this.#routeUser}/${userId}`, "GET");
    }

    async set(userId, idBadge){
        return this.#networkManager.doRequest(`${this.#route}/${userId}`, "POST", {id_badge: idBadge});
    }
}