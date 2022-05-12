import {NetworkManager} from "../framework/utils/networkManager.js";

export class ProfileRepository {
    #route;
    #networkManager;

    constructor() {
        this.#route = "/profile"
        this.#networkManager = new NetworkManager();
    }


    async getUserData(userId) {
        return await this.#networkManager.doRequest(`${this.#route}/${userId}`, "GET")
    }

}