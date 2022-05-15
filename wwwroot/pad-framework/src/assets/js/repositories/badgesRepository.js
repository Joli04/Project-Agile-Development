import {NetworkManager} from "../framework/utils/networkManager.js";

export class BadgesRepository{
    #route;
    #networkManager;

    constructor() {
        this.#route = "/badges"
        this.#networkManager = new NetworkManager();
    }

    async get(){
        return this.#networkManager.doRequest(`${this.#route}`, "GET");
    }

}