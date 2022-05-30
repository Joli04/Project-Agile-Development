import {Controller} from "./controller.js";
import {PrizeRepository} from "../repositories/prizeRepository.js";
import {App} from "../app.js";

export class PrizeController extends Controller{
    #prizeView
    #prizeRepository

    constructor() {
        super()
        this.#prizeRepository = new PrizeRepository();
        this.#setupView();
    }

    async #setupView() {
        let object = await this.#prizeRepository.get();
        this.#prizeView = await super.loadHtmlIntoContent("html_views/prize.html")
        this.#showPrizes(object);
    }

    /**
     * Method to show the prize to the user
     * @param object from the database
     */
    #showPrizes(object) {
        let prizes = this.#prizeView.querySelectorAll(
            "#prize1, #prize2, #prize3, #prize1_monthly, #prize2_monthly, #prize3_monthly");
        for (let i = 0; i < prizes.length; i++) {
            let img = new Image();
            img.src = object[i].image_link;
            img.style.width = "65px";
            img.style.height = "60px";
            img.style.marginLeft = "20px";
            prizes[i].append(object[i].image_description);
            prizes[i].append(img);
        }
    }
}