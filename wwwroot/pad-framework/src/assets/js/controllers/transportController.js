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

        await this.featuresTour()
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
    async #transportConformation() {
        let userId = App.sessionManager.get("id");
        const cancelBtn = this.#transportView.querySelector(".btn-danger");
        const confirmBtn = this.#transportView.querySelector(".btn-success");
        const modalTransportContent = this.#transportView.querySelector(".modal_transport_content");
        const errorMsg = this.#transportView.querySelector(".errorMsg");
        let transports = document.getElementsByName('vehicle-option');
        const alert = this.#transportView.querySelector(".alert");
        let getUserTransport = await this.#userTransportRepository.getUserTransport();

        // loop through, check if the user logged in is the same as of the id's in the database .
        for (let i = 0; i < getUserTransport.length; i++) {
            if (userId === getUserTransport[i].id_user) {
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
            let transport = await this.#transportRepository.get();
            for (let i = 0; i < transports.length; i++) {
                // confirmBtn.disable = false;
                if (transports[i].checked) {
                    console.log(transport[i].point)
                    let vehicleType = transports[i].value;
                    let frequencyPerVehicle = await this.#userTransportRepository.getVehicleFrequency(userId, vehicleType);
                    let frequency = frequencyPerVehicle[0].frequency += 1;
                    await this.#userTransportRepository.updateFrequency(userId, vehicleType, frequency)
                    await this.#userTransportRepository.updateUserTransport(userId);

                    // update points
                    await this.updatePoints(transport[i].point);

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

    /**
     * Function for showing guided tour through the webapplication
     *
     * @returns {Promise<void>}
     */
    async featuresTour() {

        const cancelButton = document.querySelector('.closePopup');
        const transportPopupButton = document.querySelector('.btn_transport_popup');

        let first_login = App.sessionManager.get("is_first_login");

        let intro = new WebTour();

        let steps = [
            {
                content: `<div class="welcome_tour">
                                    <h3>Welcome ${App.sessionManager.get("username")}!</h3>
                                    <p>Let's start. We'll quickly show you some features, so you know how to start your hourney!</p>
                                </div>`,
                width: '500px',
            },
            {
                element: '.transport_card',
                title: "Let's get started",
                content: 'Our platform gives you the opportunity to choose the vehicle you want to use and based on ' +
                    'that you can score points.',
                placement: 'bottom',
                onNext: function () {
                    transportPopupButton.click();
                },
                onPrevious: function () {
                    cancelButton.click();
                }
            },
            {
                element: '.vehicle_buttons',
                title: 'Vehicles',
                content: 'This is the row where you can choose which vehicle you go with to your work.',
                placement: 'bottom',
            },
            {
                element: '.btn_confirm',
                title: 'To confirm...',
                content: 'When you have chosen your vehicle, press on the "Confirm"-button to complete the process...',
                placement: 'top'
            },
            {
                element: '.btn_cancel',
                title: 'Cancel...',
                content: '...or press the "Cancel"-button to close the pop-up.',
                placement: 'top',
                onNext: function () {
                    cancelButton.click();
                }
            },
            {
                element: '.listContent',
                title: 'Navigation Bar',
                content: 'Our platform provides more functionalities! This is the navigation bar to navigate ' +
                    'through the pages.',
                placement: 'bottom',
            },
            {
                element: '.profile',
                title: 'Profile',
                content: 'In "Profile" you will find all your statistics and personal information. There are also ' +
                    'badges that you have achieved.',
                placement: 'bottom',
            },
            {
                element: '.scoreboard',
                title: 'Scoreboard',
                content: 'In "Scoreboard" you can see other users and their points. You can compete with them by ' +
                    'filling your own point in the application every day you have to work!',
                placement: 'bottom',
            },
            {
                element: '.prize',
                title: 'Prize',
                content: "In 'Prize' you will find all the prizes you can get with only the highest number of " +
                    "points. You don't do it for nothing!",
                placement: 'bottom',
            },
            {
                element: '.badges',
                title: 'Badges',
                content: 'In "Badges" you will find all the badges you can get. If the badge is grey, you still ' +
                    'need to get it, but if the badge is highlighted, you have already done that!',
                placement: 'bottom',
            },
            {
                element: '.admin',
                title: 'Admin',
                content: 'In "Admin" you get access to our platform. You can change the prices, descriptions ' +
                    'and even the images.',
                placement: 'bottom',
            },
            {
                title: 'Enjoy of your journey!',
                content: 'Now you know enough to start using our platform! Enjoy and we will see you in the green future!',
                placement: 'bottom',
            }
        ]

        intro.setSteps(steps);
        intro.start();
        if (first_login === 1 && !App.sessionManager.get('tour')) {
            // intro.start();
            // await this.#transportRepository.setFirstLogin(App.sessionManager.get("id"), first_login)
        }

        // App.sessionManager.set('tour', 'runned');

    }
}
