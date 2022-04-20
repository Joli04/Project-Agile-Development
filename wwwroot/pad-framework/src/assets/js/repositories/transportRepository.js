import {NetworkManager} from "../framework/utils/networkManager.js";

export class TransportRepository {
    #route
    #networkManager

    constructor() {
        this.#route = "/transport"
        this.#networkManager = new NetworkManager();
    }

    async getAll(){

    }

    async get(){
        console.log(this.#route)
        return await this.#networkManager.doRequest(`${this.#route}`, "GET");
        // return await this.#networkManager.doRequest(`${this.#route}`, "POST", {image_name: name, image_link: link});
    }
}
