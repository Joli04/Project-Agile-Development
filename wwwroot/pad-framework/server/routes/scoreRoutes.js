class scoreRoutes {
    #errorCodes = require('../framework/utils/httpErrorCodes.js');
    #databaseHelper = require('../framework/utils/databaseHelper.js');
    #app

    constructor(app) {

        this.#app = app;
        this.#getScores();
    }

    #getScores() {
        this.#app.get("/score", async (req, res) =>{
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "SELECT username, location, score FROM robbert",
                });


                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
            }
            catch (e){
                res.stat(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e})
            }
        });
    }
}

module.exports = scoreRoutes;
