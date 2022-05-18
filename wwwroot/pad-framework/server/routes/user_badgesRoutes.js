class BadgesRoutes{
    #app;
    #databaseHelper = require("../framework/utils/databaseHelper");
    #errorCodes = require("../framework/utils/httpErrorCodes");

    constructor(app) {
        this.#app = app;
        this.#getUserBadges();
        this.#updateUserBadges();
    }

    #getUserBadges(){
        this.#app.get("/user_badges", async (req, res) => {

            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "SELECT * FROM user_badge"
                });

                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
            }catch(e){
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }

    #updateUserBadges(){
        this.#app.post("/user_badges", async (req, res) => {

            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "UPDATE `user_badges` SET `badge_seen`= 1"
                });

                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
            }catch(e){
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }
}

module.exports = BadgesRoutes;