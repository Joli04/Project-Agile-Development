/**
 *
 * @author Bartek Tynior
 */
class ProfileRoutes {
    #errorCodes = require("../framework/utils/httpErrorCodes")
    #databaseHelper = require("../framework/utils/databaseHelper")
    #cryptoHelper = require("../framework/utils/cryptoHelper");
    #app

    /**
     * @param app - ExpressJS instance(web application) we get passed automatically via app.js
     * Important: always make sure there is an app parameter in your constructor!
     */
    constructor(app) {
        this.#app = app;

        this.#getUserData()
    }

    #getUserData() {
        this.#app.get("/profile/:id", async (req, res) => {
            const id = req.params.id;

            try {
                const data = await this.#databaseHelper.handleQuery({
                    //Select all the usernames, locations and scores from the users table
                    query: "SELECT id, username, profile_image, score, frequency_car, frequency_walk_bike, " +
                        "frequency_scooter, frequency_public_transport, branch, badges.badge_name, " +
                        "badges.badge_description, badges.badge_image FROM users JOIN user_badge ON users.id = user_badge.id_user " +
                        "JOIN badges ON badges.id_badge = user_badge.id_badge WHERE id = ?",
                    values: [id]

                });
                //just give all data back as json, could also be empty
                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);

            } catch (e) {
                //Gives an error if the request went wrong
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e})

            }

        })
    }

}

module.exports = ProfileRoutes
