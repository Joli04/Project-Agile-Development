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
    async get() {
        console.log(this.#route)
        return await this.#networkManager.doRequest(`${this.#route}`, "GET");
    }


    /**
     * @param textprize1 - The value that will be placed for prize 1.
     * @param textprize2 - The value that will be placed for prize 2.
     * @param textprize3 - The value that will be placed for prize 3.
     * @param value - The value of the button that has been clicked.
     * @returns {Promise<*>}
     */
    async settextprize(textprize1, textprize2, textprize3, value) {
        console.log(this.#route)
        return await this.#networkManager.doRequest(`${this.#route}/${textprize1}/${textprize2}/${textprize3}/${value}`, "POST");
    }
}    
