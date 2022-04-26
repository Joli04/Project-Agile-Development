
class pointsRoute{
    #app;
    #databaseHelper = require("../framework/utils/databaseHelper");
    #errorCodes = require("../framework/utils/httpErrorCodes");

    constructor(app) {
        this.#app = app;
        this.#getPoints();
        this.#setScore();
    }

    #setScore() {
        this.#app.post("/points/:id", async (req, res) => {
            const getId = req.params.id;
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "UPDATE users SET score = ? WHERE id = ?",
                    values: [req.body.score, getId]
                });
                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);

            }catch(e){
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }

    #getPoints() {
        this.#app.get("/points/:id", async (req, res) => {

            const getId = req.params.id;

            try {
                const data = await this.#databaseHelper.handleQuery({
                        //query: "INSERT INTO users(username,password, location,score) VALUES(?, ?, ?,?)",
                        query: "SELECT score FROM users WHERE id = ?",
                        values: [getId]
                });

                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
            }catch(e){
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }
}

module.exports = pointsRoute;