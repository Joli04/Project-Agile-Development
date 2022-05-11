import {Controller} from "./controller.js";
import {BadgesRepository} from "../repositories/badgesRepository.js";

export class BadgesController extends Controller{
    #badgesView;
    #badgesRepository;

    constructor() {
        super();

        this.#badgesRepository = new BadgesRepository();

        this.#setupView();
    }

    async #setupView(){
        let objects;

        this.#badgesView = await super.loadHtmlIntoContent("html_views/badges.html");
        objects = await this.#badgesRepository.get();
        this.createBadges(objects);
    }

    createBadges(objects){
        // while (this.#badgesView.firstChild) {
        //     this.#badgesView.removeChild(this.#badgesView.lastChild);
        // }
        for(let i = 0; i < objects.length; i++) {

            let divBadge = document.createElement("div");
            let imgBadge = new Image();
            let numberBadge = document.createElement("p");
            let descBadge = document.createElement("p");
            let gehaald = objects[i].badge_achieved;

            imgBadge.src = objects[i].badge_image;
            numberBadge.textContent = objects[i].id_badge;
            descBadge.textContent = objects[i].badge_description;

            if(gehaald == 0){

            }

            this.#badgesView.appendChild(divBadge);
            divBadge.appendChild(imgBadge);
            divBadge.appendChild(numberBadge);
            divBadge.appendChild(descBadge);
        }
    }
}