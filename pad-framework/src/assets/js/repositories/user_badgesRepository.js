import {NetworkManager} from "../framework/utils/networkManager.js";

export class user_badgesRepository{
    #route;
    #networkManager;

    constructor() {
        this.#route = "/user_badges"
        this.#networkManager = new NetworkManager();
    }

    async get(){
        return this.#networkManager.doRequest(`${this.#route}`, "GET");
    }

    async update(waarde1){
        return await this.#networkManager.doRequest(`${this.#route}`, "POST",
            {"waarde1": waarde1});
    }

}