import {ScoreboardRepository} from "../repositories/scoreboardRepository.js";
import {PointsRepository} from "../repositories/pointsRepository.js";
import {BadgesRepository} from "../repositories/badgesRepository.js";
import {user_badgesRepository} from "../repositories/user_badgesRepository.js";
// import {ImagesRepo} from "../repositories/imagesRepo";
import {App} from "../app.js";
import {Controller} from "./controller.js";


export class ScoreboardController extends Controller {
    #scoreboardView
    #scoreboardRepository
    #pointsRepository
    #badgesRepository
    #user_badgesRepository

    constructor() {
        super();

        this.#pointsRepository = new PointsRepository();
        this.#scoreboardRepository = new ScoreboardRepository();
        this.#badgesRepository = new BadgesRepository();
        this.#user_badgesRepository = new user_badgesRepository();
        //this.#imageRepo = new ImagesRepo();

        this.#setupView();
    }

    async #setupView() {

        this.#scoreboardView = await super.loadHtmlIntoContent("html_views/scoreboard.html")

        await this.sortByPlace();
        await this.selectPlace();
        await this.badgePopUp();

    }

    #createScoreboard(objects, container) {
        container.innerHTML = "";
        let fragment = document.createDocumentFragment();

        for (let i = 0; i < objects.length; i++) {

            let tr = document.createElement('tr')

            let number = document.createElement('th')
            number.scope = 'row'
            number.className = 'text-center'
            let username = document.createElement('td')
            username.className = 'text-center'
            let location = document.createElement('td')
            location.className = 'text-center'
            let score = document.createElement('td')
            score.className = 'text-center'


            number.textContent = "#" + (i + 1);
            username.textContent = objects[i].username
            // Highlights all the information of the user currently logged in.
            if (username.textContent === App.sessionManager.get("username")) {
                tr.style.backgroundColor = "#dbdbdb"
            }
            location.textContent = objects[i].location
            score.textContent = objects[i].score

            tr.append(number, username, location, score)

            fragment.appendChild(tr);
        }

        container.appendChild(fragment);
    }

    async sortByPlace() {
        //Gets the value of the place/branche that was chosen.
        let places = this.#scoreboardView.querySelector("#places").value;
        //Objects has all the data that comes back from our request that we made in our repository
        let objects = await this.#scoreboardRepository.get(places);
        //Creates the scoreboard with the variable objects
        this.#createScoreboard(objects, this.#scoreboardView.querySelector('#tablebody'))
    }

    async selectPlace() {
        //Everytime when a different branche is chosen, there will be a new table.
        this.#scoreboardView.querySelector("#places").addEventListener("change", (e) => {
            this.#scoreboardView.querySelector('#tablebody').innerHTML = "";
            this.sortByPlace();
        })
    }

    // async sortByPlace(){
    //     //Gets the value of the place/branche that was chosen.
    //     let places = document.getElementById("places").value
    //     //Objects has all the data that comes back from our request that we made in our repository
    //     let objects = await this.#scoreboardRepository.get(places);
    //     //Creates the scoreboard with the variable objects
    //     ScoreboardController.#createScoreboard(objects, document.getElementById('tablebody'))
    // }
    //
    // async selectPlace() {
    //     //Everytime when a different branche is chosen, there will be a new table.
    //     document.getElementById("places").addEventListener("change", (e) => {
    //         document.getElementById('tablebody').innerHTML = "";
    //         this.sortByPlace();
    //     })
    // }

    async badgePopUp() {
        const popUp = this.#scoreboardView.querySelector(".badge-popup");
        const badge = await this.#scoreboardRepository.getBadges();
        const closebtnPopUp = this.#scoreboardView.querySelector(".closepopup")
        const userBadge = await this.#user_badgesRepository.get();
        console.log(userBadge)
        console.log(badge)

        await this.showCorrectBadge();
        for (let i = 0; i < badge.length; i++) {

            let badgeAchieved = badge[i].badge_achieved

            console.log(badgeAchieved)
            if (badgeAchieved === 0){
                console.log("dit doet iets")
                popUp.style.visibility = "visible"
                popUp.style.top = "75%"
                popUp.style.transform = "translate(-50%, -50%) scale(1)"
                await this.#badgesRepository.update(1);
                break
            }
            else{

            }
        }

        // for (let i = 0; i < userBadge.length; i++) {
        //     let userBadgeAchieved = userBadge[i].badge_seen
        //     let userid = userBadge[i].id_user
        //     let badgeId = userBadge[i].id_badge
        //     console.log(userBadgeAchieved)
        //
        //         if (userid ===  && badgeId === )
        // }

        closebtnPopUp.addEventListener("click", () => {
            popUp.style.visibility = "hidden"
            popUp.style.transition = "transform` 0.4s, top 0.4s"
            popUp.style.transform = "translate(-50%, -50%) scale(0.1)"
        })
    }

    async showCorrectBadge() {

        const imageSrc = this.#scoreboardView.querySelector(".imgBadge");
        const badge = await this.#scoreboardRepository.getBadges();

        for (let i = 0; i < badge.length; i++) {

            let badgeAchieved = badge[i].badge_achieved

            if (badgeAchieved === 0){
                imageSrc.src = await badge[i].badge_image;
                console.log("ja")
                break
            }
            else {
                console.log("nee")
            }
        }


    }

}
