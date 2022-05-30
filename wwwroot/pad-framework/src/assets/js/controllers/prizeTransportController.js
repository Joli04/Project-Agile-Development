import {Controller} from "./controller.js";
import {TransportRepository} from "../repositories/transportRepository.js";
import {PrizeRepository} from "../repositories/prizeRepository.js";
import {PointsRepository} from "../repositories/pointsRepository.js";
import {App} from "../app.js";

export class PrizeTransportController extends Controller {

    #prizeView
    #transportRepository
    #prizeRepository
    #pointsRepository

    constructor() {
        super()
        this.#transportRepository = new TransportRepository();
        this.#prizeRepository = new PrizeRepository();
        this.#pointsRepository = new PointsRepository();
        this.#setupView();

    }

    /**
     * load the html document before the methods.
     * @returns {Promise<void>}
     */
    async #setupView() {
        let object = await this.#prizeRepository.get();
        this.#prizeView = await super.loadHtmlIntoContent("html_views/prize.html")

        this.#showTransportModal();
        this.#transportContent();
        this.#transportConformation();
        this.#showPrizes(object);
    }

    /**
     * if you click outside of the modal, it closes.
     */
    #offClickModal() {
        let modal = document.querySelector(".modal");
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

    #showPrizes(object) {
        let prizes = document.querySelectorAll("#prize1, #prize2, #prize3");
        for (let i = 0; i < prizes.length; i++) {
            let img = new Image();
            img.src = object[i].image_link;
            img.style.width = "60px";
            img.style.height = "60px";
            img.style.marginLeft = "20px";
            prizes[i].append(object[i].image_description)
            prizes[i].append(img)
        }
    }

    /**
     * Show and close transport modal.
     */
    #showTransportModal() {
        const vehiclePopup = document.querySelector("#vehiclePopup");
        const closeButtonPopup = document.querySelector(".closePopup");
        const buttonPopup = document.querySelector(".btn_transport_popup");
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
        const totalBtn = this.#prizeView.querySelectorAll(
            "#car-button, #e-car-button, #bus-button, #cycling-button, #walking-button");
        const modalTransportContent = this.#prizeView.querySelector(".modal_transport_content")
        const transport = this.#prizeView.querySelectorAll(
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
     * @param vehicleType
     * @returns {Promise<void>}
     */
    async updatePoints(points, vehicleType) {
        let userId = App.sessionManager.get("id");
        let userScore = await this.#pointsRepository.get(userId, vehicleType);

        console.log(userScore)
        let totalScore = userScore[0].score += points;
        let frequency = userScore[0].frequency += 1;
        this.#pointsRepository.set(totalScore, vehicleType, frequency, userId);
    }

    /**
     * Method that confirms your vehicle choice, and give the option to cancel.
     */
    #transportConformation(userId) {
        const cancelBtn = document.querySelector(".btn-danger");
        const confirmBtn = document.querySelector(".btn-success");
        const modalTransportContent = document.querySelector(".modal_transport_content");
        const errorMsg = document.querySelector(".errorMsg");
        let transports = document.getElementsByName('vehicle-option');
        const alert = document.querySelector(".alert");
        document.querySelector('.alert').style.display = "none";


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

        confirmBtn.addEventListener("click", async (event) => {
            let score = await this.#transportRepository.get();
            // let points = 0;
            for (let i = 0; i < transports.length; i++) {
                if (transports[i].checked) {
                    console.log(score[i].point)
                    let vehicleType = transports[i].value;
                    await this.updatePoints(score[i].point, vehicleType);
                    setTimeout(function () {
                        alert.style.display = "none";
                    }, 2000);
                   alert.style.display = "block";
                }
            }
        })
        // if(window.getComputedStyle(modalTransportContent).display === "block"){
        //     cancelBtn.style.display = "block";
        //     confirmBtn.style.display = "block";
        //     cancelBtn.addEventListener("click", () =>{
        //         modalTransportContent.style.display = "none";
        //     })
        // }

    }
}
