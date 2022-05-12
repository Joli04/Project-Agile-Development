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
        this.#app.get("/scoreboard/:place", async (req, res) => {
            const place = req.params.place;

            if (place !== 'Geen') {
                try {
                    const data = await this.#databaseHelper.handleQuery({
                        //Select all the usernames, locations and scores from the users table where the users have place
                        //as location.
                        query: "SELECT id, username, location, score, RANK () OVER (ORDER BY score DESC) nr FROM users WHERE location = ?",
                        values: [place]
                    });

                    //just give all data back as json, could also be empty
                    res.status(this.#errorCodes.HTTP_OK_CODE).json(data);

                } catch (e) {
                    //Gives an error if the request went wrong
                    res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e})
                }
            } else {
                try {
                    const data = await this.#databaseHelper.handleQuery({
                        //Select all the usernames, locations and scores from the users table
                        query: "SELECT id, username, location, score, RANK () OVER (ORDER BY score DESC) nr  FROM users",
                    });

                    //just give all data back as json, could also be empty
                    res.status(this.#errorCodes.HTTP_OK_CODE).json(data);

                } catch (e) {
                    //Gives an error if the request went wrong
                    res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e})
                }
            }
        });
    }

}

module.exports = ScoreboardRoutes;
