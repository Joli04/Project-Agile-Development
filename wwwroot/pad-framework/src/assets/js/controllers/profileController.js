import {Controller} from "./controller.js";
import {ProfileRepository} from "../repositories/profileRepository.js";
import {App} from "../app.js";

export class ProfileController extends Controller {
    #profileView
    #profileRepository

    constructor() {
        super();

        this.#profileRepository = new ProfileRepository();

        this.#setupView();
    }

    async #setupView() {

        this.#profileView = await super.loadHtmlIntoContent("html_views/profile.html")

        this.fetchUserData(App.sessionManager.get('id'))
    }

    /**
     * Fetch all user information saved in the database and place in it on the website
     *
     * @param userId user's ID-number from the database. It is used for session's management
     * @returns {Promise<void>}
     */
    async fetchUserData(userId) {

        let userData = await this.#profileRepository.getUserData(userId);

        const username = this.#profileView.querySelector("span.user_name");
        // const branch = this.#profileView.querySelector("span.user_function");
        const score = this.#profileView.querySelector("span.score_points");
        // const location = this.#profileView.querySelector("span.user_location");

        username.innerHTML = userData[0].username;
        // branch.innerHTML = userData[0].
        score.innerHTML = userData[0].score;
        // location.innerHTML = userData[0].location;

        // let element = document.getElementById("row");
        // let fragment = document.createDocumentFragment();

        // for (let i = 0; i < badges.length; i++) {
        //     const badgeName = badges[i].badge_name;
        //     const badgeDescription = badges[i].badge_description;
        //     const badgeImage = badges[i].badge_image
        //
        //     let col = document.createElement('div')
        //     col.className = 'col-6'
        //     let card = document.createElement('div')
        //     card.className = 'card'
        //     let cardBody = document.createElement('div')
        //     cardBody.className = 'card-body text-center'
        //
        //     let title = document.createElement('h5')
        //     let badge = document.createElement('')
        //
        // }

    }
}