import {NetworkManager} from "../framework/utils/networkManager.js";

export class PrizeRepository {
    #route
    #networkManager

    constructor() {
        this.#route = "/prize"
        this.#networkManager = new NetworkManager();
    }

    /**
     * Get request
     * @returns {Promise<*>}
     */
    async get(){
        console.log(this.#route)
        return await this.#networkManager.doRequest(`${this.#route}`, "GET");
    }
    
    async settextprize(textprize1,textprize2, textprize3, waarde){
        console.log(this.#route)
        return await this.#networkManager.doRequest(`${this.#route}/${textprize1}/${textprize2}/${textprize3}/${waarde}`, "GET");
    }

    async setNewImage(waarde,formData) {
        return await this.#networkManager.doFileRequest(`/upload/prize/${waarde}`, "POST", formData);
    }

}
