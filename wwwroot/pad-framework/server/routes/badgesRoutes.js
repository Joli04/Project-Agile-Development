class BadgesRoutes{
    #app;
    #databaseHelper = require("../framework/utils/databaseHelper");
    #errorCodes = require("../framework/utils/httpErrorCodes");

    constructor(app) {
        this.#app = app;
        this.#getBadges();
        this.#getUser();
        this.#setAchieved();
    }

    /**
     * method that gets al the data from the badges tabel and that gets the achieved data from the user_badge tabel
     */
    #getBadges(){
        this.#app.get("/badges/:id", async (req, res) => {
            const getId = req.params.id;
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "SELECT b.*, ub.badge_seen " +
                        "FROM badges AS b " +
                        "LEFT JOIN user_badge AS ub ON ub.id_user = ? " +
                        "AND ub.id_badge = b.id_badge " +
                        "ORDER BY ub.badge_seen DESC, b.id_badge ASC",
                    values: [getId]
                });

                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
            }catch(e){
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }

    #getUser(){
        this.#app.get("/user/:id", async (req, res) => {
            const getId = req.params.id;
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "SELECT id, score, frequency_e_car, frequency_public_transport,frequency_walk, frequency_bike" +
                        "FROM users WHERE id = ?",
                    values: [getId]
                });

                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
            }catch(e){
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }

    #setAchieved(){
        this.#app.post("/badges/:id", async (req, res) => {
            const getId = req.params.id;
            const idBadge = req.body.id_badge;
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "INSERT INTO user_badge (`id_user`,`id_badge`,`badge_seen`) VALUES (?)",
                    values: [[getId, idBadge, 1]]
                });

                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
            }catch(e){
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }
}

module.exports = BadgesRoutes;