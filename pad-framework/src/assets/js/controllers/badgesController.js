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
        let user
        let userId = App.sessionManager.get("id");

        this.#badgesView = await super.loadHtmlIntoContent("html_views/badges.html");
        objects = await this.#badgesRepository.get(userId);
        user = await this.#badgesRepository.getUser(userId);
        this.achieveBadge(objects, user);
        this.createBadges(objects);
    }

    /***
     * method that gets all the badges from the database and puts them in the view
     *
     * @param badges = data of the badges
     */
    createBadges(badges){
        let badgeTable = this.#badgesView.querySelector(".badges-frame");

        for(let i = 0; i < badges.length; i++) {

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
            let achieved = badges[i].badge_seen;

            if(achieved){
                divBadge.classList.add("badges-achieved");
                divImage.classList.add("badge-img-achieved");
            } else {
                divBadge.classList.add("badges-unachieved");
                divImage.classList.add("badge-img-unachieved");
            }

            imgBadge.src = badges[i].badge_image;
            numberBadge.textContent = badges[i].id_badge;
            nameBadge.textContent = badges[i].badge_name;
            descBadge.textContent = badges[i].badge_description;

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

    /**
     * method that checks if a badge is achieved and then adds it to the user_badge tabel
     *
     * @param objects = all data of badges
     * @param user = all data of user
     * @returns {Promise<void>}
     */
    async achieveBadge(objects, user){
        for(let i = 0; i < objects.length; i++) {
            if (objects[i].badge_seen == null) {
                if (objects[i].badge_type == "Walk") {
                    if (user[0].frequency_walk >= objects[i].badge_req) {
                        this.#badgesRepository.set(user[0].id, objects[i].id_badge);
                    }
                } else if (objects[i].badge_type == "Bike") {
                    if (user[0].frequency_bike >= objects[i].badge_req) {
                        this.#badgesRepository.set(user[0].id, objects[i].id_badge);
                    }
                } else if (objects[i].badge_type == "Public transit") {
                    if (user[0].frequency_public_transport >= objects[i].badge_req) {
                        this.#badgesRepository.set(user[0].id, objects[i].id_badge);
                    }
                } else if (objects[i].badge_type == "Score") {
                    if (user[0].score >= objects[i].badge_req) {
                        this.#badgesRepository.set(user[0].id, objects[i].id_badge);
                        this.#setupView();
                    }
                } else if (objects[i].badge_type == "E-car") {
                    if (user[0].frequency_e_car >= objects[i].badge_req) {
                        this.#badgesRepository.set(user[0].id, objects[i].id_badge);
                    }
                }
            }
        }
    }
}