class ScoreboardRoutes {
    #errorCodes = require("../framework/utils/httpErrorCodes")
    #databaseHelper = require("../framework/utils/databaseHelper")
    #app

    constructor(app) {
        this.#app = app;

        this.#getUsers()
    }

    #getUsers() {
        //If place is not 'Geen', we select all the users who are active in that specific location.
        // If it is we just select every user in our database
        this.#app.get("/scoreboard/:place/:scoreType", async (req, res) => {
            const place = req.params.place;
            const scoreType = req.params.scoreType;
            let data;

            try {
                if (place !== "none") {
                    data = await this.#databaseHelper.handleQuery({
                        //Select all the usernames, locations and scores from the users table where the users have place
                        //as location.
                        query: `SELECT id,
                                       username,
                                       location,
                                       CASE "${scoreType}"
                                           WHEN 'total' THEN u.score
                                           WHEN 'monthly' THEN u.score_monthly
                                           WHEN 'yearly' THEN u.score_yearly END AS score
                                FROM users u ORDER BY score DESC 
                                WHERE u.location = "${place}"`
                    });
                } else {
                    data = await this.#databaseHelper.handleQuery({
                        //Select all the usernames, locations and scores from the users table where the users have place
                        //as location.
                        query: `SELECT id,
                                       username,
                                       location,
                                       CASE "${scoreType}"
                                           WHEN 'total' THEN u.score
                                           WHEN 'monthly' THEN u.score_monthly
                                           WHEN 'yearly' THEN u.score_yearly END AS score
                                FROM users u ORDER BY score DESC`
                    });
                }
                //just give all data back as json, could also be empty
                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);

            } catch (e) {
                //Gives an error if the request went wrong
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e})
            }
        });
    }
}

module.exports = ScoreboardRoutes;
