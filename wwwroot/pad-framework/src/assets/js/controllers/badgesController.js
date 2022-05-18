import {Controller} from "./controller.js";
import {BadgesRepository} from "../repositories/badgesRepository.js";
import {App} from "../app.js";

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
        let userId = App.sessionManager.get("id");

        this.#badgesView = await super.loadHtmlIntoContent("html_views/badges.html");
        objects = await this.#badgesRepository.get(userId);
        this.createBadges(objects);
    }

    createBadges(objects){

        let badgeTable = this.#badgesView.querySelector(".badges");

        for(let i = 0; i < objects.length; i++) {

            let divBadge = document.createElement("div");
            let imgBadge = new Image();
            let numberBadge = document.createElement("p");
            let descBadge = document.createElement("p");
            let gehaald = objects[i].badge_seen;

            divBadge.style.width = "250px";
            if(gehaald == 1){
                divBadge.style.backgroundColor = "rgba(94, 255, 100, 0.8)"
            } else {
                divBadge.style.backgroundColor = "rgba(168, 168, 168, 1)"
            }

            imgBadge.src = objects[i].badge_image;
            imgBadge.style.height = "100px";
            imgBadge.style.width = "100px";
            numberBadge.textContent = objects[i].id_badge;
            descBadge.textContent = objects[i].badge_description;

            badgeTable.appendChild(divBadge);
            divBadge.appendChild(imgBadge);
            divBadge.appendChild(numberBadge);
            divBadge.appendChild(descBadge);
        }
    }
}