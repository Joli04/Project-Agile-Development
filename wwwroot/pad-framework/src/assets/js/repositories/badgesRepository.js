import {NetworkManager} from "../framework/utils/networkManager.js";

export class BadgesRepository{
    #route;
    #route2;
    #networkManager;

    constructor() {
        this.#route = "/badges"
        this.#route2 = "/badges/achieved"
        this.#networkManager = new NetworkManager();
    }

    async get(userId){
        return this.#networkManager.doRequest(`${this.#route}/${userId}`, "GET");
    }
}