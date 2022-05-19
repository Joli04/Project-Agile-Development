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

        let badgeTable = this.#badgesView.querySelector(".badges");

        for(let i = 0; i < objects.length; i++) {

            let divBadge = document.createElement("div");
            let imgBadge = new Image();
            let numberBadge = document.createElement("p");
            let descBadge = document.createElement("p");
            let achieved = objects[i].badge_seen;

            divBadge.style.width = "250px";
            if(achieved){
                divBadge.style.backgroundColor = "rgba(94, 255, 100, 0.8)";
            } else {
                divBadge.style.backgroundColor = "rgba(168, 168, 168, 1)";
            }

            imgBadge.src = objects[i].badge_image;
            imgBadge.style.height = "100px";
            imgBadge.style.width = "100px";
            imgBadge.style.display = "block";
            imgBadge.style.margin = "0 auto";
            numberBadge.textContent = objects[i].id_badge;
            numberBadge.style.textAlign = "center";
            descBadge.textContent = objects[i].badge_description;
            descBadge.style.textAlign = "center";

            badgeTable.appendChild(divBadge);
            divBadge.appendChild(imgBadge);
            divBadge.appendChild(numberBadge);
            divBadge.appendChild(descBadge);
        }
    }
}