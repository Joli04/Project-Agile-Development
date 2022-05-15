/**
 * Entry point front end application - there is also an app.js for the backend (server folder)!
 *
 * All methods are static in this class because we only want one instance of this class
 * Available via a static reference(no object): `App.sessionManager.<..>` or `App.networkManager.<..>` or `App.loadController(..)`
 *
 * @author Lennard Fonteijn & Pim Meijer
 */

import {SessionManager} from "./framework/utils/sessionManager.js"
import {LoginController} from "./controllers/loginController.js"
import {NavbarController} from "./controllers/navbarController.js"
import {UploadController} from "./controllers/uploadController.js"
import {ScoreboardController} from "./controllers/scoreboardController.js";
import {PointsController} from "./controllers/pointsController.js";
import {BadgesController} from "./controllers/badgesController.js"
import {ProfileController} from "./controllers/profileController.js";
import {PrizeTransportController} from "./controllers/prizeTransportController.js";
import {AdminController} from "./controllers/adminController.js";

export class App {
    //we only need one instance of the sessionManager, thus static use here
    // all classes should use this instance of sessionManager
    static sessionManager = new SessionManager();

    //controller identifiers, add new controllers here
    static CONTROLLER_NAVBAR = "navbar";
    static CONTROLLER_LOGIN = "login";
    static CONTROLLER_LOGOUT = "logout";
    static CONTROLLER_PROFILE = "profile";
    static CONTROLLER_UPLOAD = "upload";
    static CONTROLLER_SCOREBOARD = "scoreboard";
    static CONTROLLER_POINTS = "points";
    static CONTROLLER_PRIZE = "prize";
    static CONTROLLER_BADGES = "badges"
    static CONTROLLER_ADMIN = "admin"


    constructor() {
        //Always load the navigation
        App.loadController(App.CONTROLLER_NAVBAR);

        //Attempt to load the controller from the URL, if it fails, fall back to the welcome controller.
        App.loadControllerFromUrl(App.CONTROLLER_SCOREBOARD);
    }

    /**
     * Loads a controller
     * @param name - name of controller - see static attributes for all the controller names
     * @param controllerData - data to pass from on controller to another - default empty object
     * @returns {boolean} - successful controller change
     */
    static loadController(name, controllerData = {}) {
        console.log("loadController: " + name);

        //log the data if data is being passed via controllers
        if (controllerData && Object.entries(controllerData).length !== 0) {
            console.log(controllerData);
        }

        //load right controller based on the passed name to this function
        switch (name) {
            case App.CONTROLLER_NAVBAR:
                new NavbarController();
                break;

            case App.CONTROLLER_LOGIN:
                App.setCurrentController(name);
                App.isLoggedIn(() => new ProfileController(), () => new LoginController());
                break;

            case App.CONTROLLER_LOGOUT:
                App.setCurrentController(name);
                App.handleLogout();
                break;

            case App.CONTROLLER_PROFILE:
                App.setCurrentController(name);
                App.isLoggedIn(() => new ProfileController(), () => new LoginController());
                break;

            case App.CONTROLLER_UPLOAD:
                App.isLoggedIn(() => new UploadController(), () => new LoginController());
                break;

            case App.CONTROLLER_SCOREBOARD:
                App.setCurrentController(name)
                App.isLoggedIn(() => new ScoreboardController(), () => new LoginController());
                break;
            case App.CONTROLLER_POINTS:
                App.setCurrentController(name);
                App.isLoggedIn(() => new PointsController(), () => new LoginController());
                break;
            case App.CONTROLLER_PRIZE:
                App.setCurrentController(name);
                App.isLoggedIn(() => new PrizeTransportController(), () => new LoginController());
                break;
            case App.CONTROLLER_BADGES:
                App.setCurrentController(name);
                App.isLoggedIn(() => new BadgesController(), () => new LoginController());
                break;
            case App.CONTROLLER_ADMIN:
                App.setCurrentController(name)
                App.isLoggedIn(() => new AdminController(), () => new LoginController());
                break;
            default:
                return false;
        }
        return true;
    }

    /**
     * Alternative way of loading controller by url
     * @param fallbackController
     */
    static loadControllerFromUrl(fallbackController) {
        const currentController = App.getCurrentController();

        if (currentController) {
            if (!App.loadController(currentController)) {
                App.loadController(fallbackController);
            }
        } else {
            App.loadController(fallbackController);
        }
    }

    /**
     * Looks at current URL in the browser to get current controller name
     * @returns {string}
     */
    static getCurrentController() {
        return location.hash.slice(1);
    }

    /**
     * Sets current controller name in URL of the browser
     * @param name
     */
    static setCurrentController(name) {
        location.hash = name;
    }

    /**
     * Convenience functions to handle logged-in states
     * @param whenYes - function to execute when user is logged in
     * @param whenNo - function to execute when user is logged in
     */
    static isLoggedIn(whenYes, whenNo) {
        if (App.sessionManager.get("username")) {
            whenYes();
        } else {
            whenNo();
        }
    }

    /**
     * Removes username via sessionManager and loads the login screen
     */
    static handleLogout() {
        App.sessionManager.remove("username");
        App.sessionManager.remove("password");
        App.sessionManager.remove("id");

        //go to login screen
        App.loadController(App.CONTROLLER_LOGIN);
    }
}

//When the DOM is ready, kick off our application.
window.addEventListener("DOMContentLoaded", _ => {
    new App();
});
