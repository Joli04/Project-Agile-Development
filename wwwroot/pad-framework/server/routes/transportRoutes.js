class TransportRoutes {
    #errorCodes = require('../framework/utils/httpErrorCodes');
    #databaseHelper = require('../framework/utils/databaseHelper');
    #app

    constructor(app) {
        this.#app = app;
        // this.#getImages();
        this.#getPoints();
    }

    #getImages() {
        // get request to test in the browser
        this.#app.get("/transport", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "SELECT * FROM transport",
                });
                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
            } catch (e) {
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e})
            }
        });
    }

    /**
     * Get all the values in the column point from table transport.
     */
    #getPoints(){
        this.#app.get("/transport", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "SELECT * FROM transport",
                });
                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
            } catch (e) {
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e})
            }
        })
    }
}

module.exports = TransportRoutes;