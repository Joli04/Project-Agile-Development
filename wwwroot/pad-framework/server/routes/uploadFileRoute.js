/**
 *
 * @author Bartek Tynior
 */

class UploadFileRoute {
    #errorCodes = require("../framework/utils/httpErrorCodes")
    #databaseHelper = require("../framework/utils/databaseHelper");
    #multer = require("multer");
    #app

    /**
     * @param app - ExpressJS instance(web application) we get passed automatically via app.js
     * Important: always make sure there is an app parameter in your constructor!
     */
    constructor(app) {
        this.#app = app;
        this.#uploadFile()
    }

    /**
     *
     */
    #uploadFile() {
        this.#app.post("/upload/:id", this.#multer().single("file"), (req, res) => {

            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: "No files were uploaded."});
            }
            const id = req.params.id;

            //get file by key "file", defined in front-end
            const file = req.files.userpic;
            const fileName = req.files.userpic.name;
            let uploadPath = appPath + `/uploads/${fileName}`;

            file.mv(uploadPath, (err) => {
                if (err) {
                    console.log(err)
                    return res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: err});
                } else {
                    try {
                        this.#databaseHelper.handleQuery({
                            query: "UPDATE users SET profile_image = ? WHERE id = ?",
                            values: [`./uploads/${fileName}`, id]
                        });
                        return res.status(this.#errorCodes.HTTP_OK_CODE).json("File successfully uploaded!");
                    } catch (e) {
                        res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e});
                    }
                }
            });
        });
    }
}

module.exports = UploadFileRoute
