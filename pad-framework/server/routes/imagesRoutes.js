class ImagesRoutes {
    #errorCodes = require('../framework/utils/httpErrorCodes');
    #databaseHelper = require('../framework/utils/databaseHelper');
    #app

    constructor(app) {
        this.#app = app;
        this.#getImages();
    }

    #getImages() {
        // get request to test in the browser
        this.#app.post("/images", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "SELECT * FROM images WHERE id_image = 1",
                });
                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
            } catch (ex) {
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: ex})
            }
        });
    }
}

module.exports = ImagesRoutes;