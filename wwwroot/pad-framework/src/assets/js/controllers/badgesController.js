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

    /***
     * method that gets all the badges from the database and puts them in the view
     *
     * @param objects = data of the badges
     */
    createBadges(objects){

        let badgeTable = this.#badgesView.querySelector(".badges-frame");

        for(let i = 0; i < objects.length; i++) {

            let divBadge = document.createElement("div");

            let divBadgeBody = document.createElement("div");
            divBadgeBody.classList.add("badge-body");

            let divImage = document.createElement("div");

            let imgBadge = new Image();
            imgBadge.classList.add("badge-img-top");
            let numberBadge = document.createElement("p");
            let lineBadge = document.createElement("div");
            lineBadge.classList.add("divider");
            let nameBadge = document.createElement("h4");
            let descBadge = document.createElement("p");
            let achieved = objects[i].badge_seen;

            if(achieved){
                divBadge.classList.add("badges-achieved");
                divImage.classList.add("badge-img-achieved");
            } else {
                divBadge.classList.add("badges-unachieved");
                divImage.classList.add("badge-img-unachieved");
            }

            imgBadge.src = objects[i].badge_image;
            numberBadge.textContent = objects[i].id_badge;
            nameBadge.textContent = objects[i].badge_name;
            descBadge.textContent = objects[i].badge_description;

            badgeTable.appendChild(divBadge);
            divBadge.appendChild(divImage);
            divBadge.appendChild(lineBadge);
            divBadge.appendChild(divBadgeBody);
            divImage.appendChild(imgBadge);
            divImage.appendChild(numberBadge);
            divBadgeBody.appendChild(nameBadge);
            divBadgeBody.appendChild(descBadge);
        }
    }
}