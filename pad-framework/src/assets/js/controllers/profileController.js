import {Controller} from "./controller.js";
import {ProfileRepository} from "../repositories/profileRepository.js";
import {App} from "../app.js";
import {NetworkManager} from "../framework/utils/networkManager.js";

export class ProfileController extends Controller {
    #profileView
    #profileRepository
    #networkManager

    constructor() {
        super();

        this.#profileRepository = new ProfileRepository();
        this.#networkManager = new NetworkManager();

        this.#setupView();
    }

    async #setupView() {
        this.#profileView = await super.loadHtmlIntoContent("html_views/profile.html")

        const userId = App.sessionManager.get('id');

        this.#profileView.querySelector(".upload").addEventListener("click", async (event) => {
            event.preventDefault()
            await this.changeUserImage(userId)
        });

        this.#profileView.querySelector(".badges_link").addEventListener("click", (event) => {
            event.preventDefault()
            App.loadController(App.CONTROLLER_BADGES);
        })

        this.fetchAllBadges(userId)

        this.fetchUserData(userId)
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
        const branch = this.#profileView.querySelector("span.user_function");
        const score = this.#profileView.querySelector("span.score_points");
        const userPicture = this.#profileView.querySelector(".profile_image");

        const carFrequency = this.#profileView.querySelector("span.vehicle_frequency_car");
        const bikeFrequency = this.#profileView.querySelector("span.vehicle_frequency_bike");
        const eCarFrequency = this.#profileView.querySelector("span.vehicle_frequency_e_car");
        const publicTransportFrequency = this.#profileView.querySelector("span.vehicle_frequency_public_transport");
        const walkFrequency = this.#profileView.querySelector("span.vehicle_frequency_walk");


        carFrequency.innerHTML = userData[0].frequency_car;
        bikeFrequency.innerHTML = userData[0].frequency_bike;
        eCarFrequency.innerHTML = userData[0].frequency_e_car;
        walkFrequency.innerHTML = userData[0].frequency_walk;
        publicTransportFrequency.innerHTML = userData[0].frequency_public_transport;

        if (userData[0].profile_image === null) {
            userPicture.src = "assets/Media/default_profile_image.png"
        } else {
            userPicture.src = userData[0].profile_image;
        }

        username.innerHTML = userData[0].username;
        branch.innerHTML = userData[0].branch;
        score.innerHTML = userData[0].score;

    }

    async fetchAllBadges(userId) {

        let badges = await this.#profileRepository.getUserData(userId);

        let element = document.getElementById("row");
        let fragment = document.createDocumentFragment();

        for (let i = 0; i < badges.length; i++) {
            const badgeName = badges[i].badge_name;
            // const badgeDescription = badges[i].badge_description;
            const badgeImage = badges[i].badge_image;

            let col = document.createElement('div')
            col.className = 'col-6'
            let card = document.createElement('div')
            card.className = 'card'
            let cardBody = document.createElement('div')
            cardBody.className = 'card-body text-center'

            let title = document.createElement('h5')
            let badge = document.createElement('img')
            badge.className = 'badgeImage'

            title.textContent = badgeName;
            badge.src = badgeImage;

            cardBody.append(title, badge)
            card.appendChild(cardBody)
            col.appendChild(card)
            fragment.appendChild(col)
        }

        element.appendChild(fragment)

    }

    async changeUserImage(userId) {

        const fileInput = this.#profileView.querySelector("#file");


        const file = fileInput.files[0];
        const fileName = fileInput.files[0].name;
        const formData = new FormData()

        formData.append("userpic", file, `${fileName}`)

        console.log(formData)

        try {
            const response = await this.#profileRepository.setUserImage(userId, formData);
            console.log(response);

            fileInput.value = "";

        } catch (e) {
            console.error(e);
        }
    }

}
