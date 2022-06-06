import {Controller} from "./controller.js";
import {TransportRepository} from "../repositories/transportRepository.js";
import {PointsRepository} from "../repositories/pointsRepository.js";
import {App} from "../app.js";
import {user_transportRepository} from "../repositories/user_transportRepository.js";

export class TransportController extends Controller {

    #transportView
    #transportRepository
    #pointsRepository
    #userTransportRepository

    constructor() {
        super()
        this.#userTransportRepository = new user_transportRepository();
        this.#transportRepository = new TransportRepository();
        this.#pointsRepository = new PointsRepository();
        this.#setupView();

    }

    /**
     * load the html document before the methods.
     * @returns {Promise<void>}
     */
    async #setupView() {
        this.#transportView = await super.loadHtmlIntoContent("html_views/transport.html")

        this.#showTransportModal();
        this.#transportContent();
        await this.#transportConformation();
    }

    /**
     * if you click outside of the modal, it closes.
     */
    #offClickModal() {
        let modal = this.#transportView.querySelector(".modal");
        for (let i = 0; i < modal.length; i++) {
            modal[i].hidden = true;
        }

        function offClickModal(event) {
            if (event.target === modal) {
                console.log("offClickModal() clicked")
                modal.style.display = "none";
            }
        }

        window.addEventListener("click", offClickModal);
    }

    /**
     * Show and close transport modal.
     */
    #showTransportModal() {
        const vehiclePopup = this.#transportView.querySelector("#vehiclePopup");
        const closeButtonPopup = document.querySelector(".closePopup");
        const buttonPopup = this.#transportView.querySelector(".btn_transport_popup");
        buttonPopup.addEventListener("click", () => {
            vehiclePopup.style.display = "block";
        })

        closeButtonPopup.addEventListener("click", () => {
            vehiclePopup.style.display = "none";
        })
        this.#offClickModal();
    }

    /**
     * make sure the transport modal content is shown.
     */
    #transportContent() {
        const totalBtn = this.#transportView.querySelectorAll(
            "#car-button, #e-car-button, #bus-button, #cycling-button, #walking-button");
        const modalTransportContent = this.#transportView.querySelector(".modal_transport_content")
        const transport = this.#transportView.querySelectorAll(
            '#transport1, #transport4, #transport3, #transport2, #transport5');

        for (let i = 0; i < totalBtn.length; i++) {
            totalBtn[i].addEventListener("click", () => {
                transportModalContent();
            })
        }

        function transportModalContent() {
            addChildren();
            modalTransportContent.style.display = "block";
            removeChildren();
        }

        function removeChildren() {
            for (let i = 0; i < totalBtn.length; i++) {
                if (totalBtn[i].id !== event.target.id) {
                    transport[i].remove();
                }
            }
        }

        function addChildren() {
            for (let i = 0; i < totalBtn.length; i++) {
                modalTransportContent.appendChild(transport[i]);
            }
        }

    }

    /**
     * Async function that gets, updates and sets the score of the user
     *
     * @param points = the amount of point that gets added to the players score
     * @returns {Promise<void>}
     */
    async updatePoints(points) {
        let userId = App.sessionManager.get("id");
        let userScore = await this.#pointsRepository.get(userId);
        console.log(userScore)
        let totalScore = userScore[0].score += points;

        this.#pointsRepository.set(totalScore, userId);
    }

    /**
     * Method that confirms your vehicle choice, and give the option to cancel.
     */
    async #transportConformation(userId) {
        let idUser = App.sessionManager.get("id");
        const cancelBtn = this.#transportView.querySelector(".btn-danger");
        const confirmBtn = this.#transportView.querySelector(".btn-success");
        const modalTransportContent = this.#transportView.querySelector(".modal_transport_content");
        const errorMsg = this.#transportView.querySelector(".errorMsg");
        let transports = document.getElementsByName('vehicle-option');
        const alert = this.#transportView.querySelector(".alert");
        let getUserTransport = await this.#userTransportRepository.getUserTransport();

        // loop through, check if the user logged in is the same as of the id's in the database .
        for (let i = 0; i < getUserTransport.length; i++) {
            if (idUser === getUserTransport[i].id_user) {
               confirmBtn.disabled = true;
               break;
            }
        }

        // the conformation alert is hidden at first.
        this.#transportView.querySelector('.alert').style.display = "none";

        // show error message if no vehicle selected
        cancelBtn.addEventListener("click", () => {
            if (window.getComputedStyle(modalTransportContent).display === "none") {
                errorMsg.innerText = "Oeps, niks geselecteerd!";
                errorMsg.style.color = "red";
                setTimeout(function () {
                    errorMsg.innerText = "";
                }, 1600);
            }
            modalTransportContent.style.display = "none";
        });

        // update points if transport is selected
        confirmBtn.addEventListener("click", async (event) => {
            let score = await this.#transportRepository.get();

            for (let i = 0; i < transports.length; i++) {
                // confirmBtn.disable = false;
                if (transports[i].checked) {
                    console.log(score[i].point)
                    await this.#userTransportRepository.updateUserTransport(idUser);

                    let vehicleType = transports[i].value;
                    // switch (vehicleType){
                    //     case "car":
                    //         await this.#transportRepository.setFrequency(userId, vehicleType);
                    //         break
                    //     case "e-car":
                    //         await this.#transportRepository.setFrequency(userId, vehicleType);
                    //         break
                    //     case "public_transport":
                    //         await this.#transportRepository.setFrequency(userId, vehicleType);
                    //         break
                    //     case "bike":
                    //         await this.#transportRepository.setFrequency(userId, vehicleType);
                    //         break
                    //     case "walk":
                    //         await this.#transportRepository.setFrequency(userId, vehicleType);
                    //         break
                    // }

                    // update points
                    await this.updatePoints(score[i].point);

                    // show succes and the amount of
                    alert.style.display = "block";

                    // redirect to scoreboard after the points are added
                    setTimeout(function () {
                        App.loadController(App.CONTROLLER_SCOREBOARD)
                    }, 1300);
                }
            }
        })
    }
}
