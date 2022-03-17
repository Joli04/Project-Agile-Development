
class ScoreboardRoutes{
    #errorCodes = require("../framework/utils/httpErrorCodes")
    #databaseHelper = require("../framework/utils/databaseHelper")
    #app

    constructor(app) {
        this.#app = app;

        this.#getUsers()
    }

    #getUsers(){
        this.#app.get("/scoreboard", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    //Select all the usernames, locations and scores from the users table
                    query: "SELECT username, location, score FROM users",
                });

                //just give all data back as json, could also be empty
                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);

            } catch(e) {
                //Gives an error if the request went wrong
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e})
            }
        });
    }

}

module.exports = ScoreboardRoutes;
