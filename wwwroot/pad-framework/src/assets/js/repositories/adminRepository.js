import {NetworkManager} from "../framework/utils/networkManager.js";

export class AdminRepository{
    #route
    #networkManager

    constructor() {
        this.#route = "/admin"
        this.#networkManager = new NetworkManager();
    }

    async get(){
        return await this.#networkManager.doRequest(`${this.#route}`, "GET")
    }
}
