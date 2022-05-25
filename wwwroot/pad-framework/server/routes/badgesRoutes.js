class BadgesRoutes{
    #app;
    #databaseHelper = require("../framework/utils/databaseHelper");
    #errorCodes = require("../framework/utils/httpErrorCodes");

    constructor(app) {
        this.#app = app;
        this.#getBadges();
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
}

module.exports = BadgesRoutes;