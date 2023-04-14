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
        this.#uploadImage()
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
            let uploadPath = wwwrootPath + `/uploads/${fileName}`;

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

    #uploadImage() {
        this.#app.post("/upload/prize/:waarde", this.#multer().single("file"), (req, res) => {

            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: "No files were uploaded."});
            }
            // const id = req.params.id;

            //get file by key "file", defined in front-end
            const waarde = req.params.waarde;

            const file1 = req.files.image1;
            const file2 = req.files.image2;
            const file3 = req.files.image3;

            let fileName1;
            let fileName2;
            let fileName3;

            let uploadPath1;
            let uploadPath2;
            let uploadPath3;

            let image1;
            let image2;
            let image3;

            if (waarde === "yearly"){
                if(file1.length !== 0) {
                    fileName1 = req.files.image1.name;
                    uploadPath1 = wwwrootPath + `/uploads/${fileName1}`

                    file1.mv(uploadPath1, (err) => {
                        if (err) {
                            console.log(err)
                            return res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: err});
                        } else {
                            image1 = this.#databaseHelper.handleQuery({
                                query: "UPDATE prize SET image_link = ? WHERE id_prize = ?",
                                values: [`./uploads/${fileName1}`, 1]
                            });
                        }

                    });
                }

                if(file2.length !== 0) {
                    fileName2 = req.files.image2.name;
                    uploadPath2 = wwwrootPath + `/uploads/${fileName2}`

                    file2.mv(uploadPath2, (err) => {
                        if (err) {
                            console.log(err)
                            return res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: err});
                        } else {
                            image2 = this.#databaseHelper.handleQuery({
                                query: "UPDATE prize SET image_link = ? WHERE id_prize = ?",
                                values: [`./uploads/${fileName2}`, 2]
                            });
                        }

                    });
                }
                if(file3.length !== 0) {
                    fileName3 = req.files.image3.name;
                    uploadPath3 = wwwrootPath + `/uploads/${fileName3}`

                    file3.mv(uploadPath3, (err) => {
                        if (err) {
                            console.log(err)
                            return res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: err});
                        } else {
                            image3 = this.#databaseHelper.handleQuery({
                                query: "UPDATE prize SET image_link = ? WHERE id_prize = ?",
                                values: [`./uploads/${fileName3}`, 5]
                            });
                        }
                    })
                }
            }
            else{
                if(file1.length !== 0) {
                    fileName1 = req.files.image1.name;
                    uploadPath1 = wwwrootPath + `/uploads/${fileName1}`

                    file1.mv(uploadPath1, (err) => {
                        if (err) {
                            console.log(err)
                            return res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: err});
                        } else {
                            image1 = this.#databaseHelper.handleQuery({
                                query: "UPDATE prize SET image_link = ? WHERE id_prize = ?",
                                values: [`./uploads/${fileName1}`, 6]
                            });
                        }
                    });
                }
                if(file2.length !== 0) {
                    fileName2 = req.files.image2.name;
                    uploadPath2 = wwwrootPath + `/uploads/${fileName2}`

                    file2.mv(uploadPath2, (err) => {
                        if (err) {
                            console.log(err)
                            return res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: err});
                        } else {
                            image2 = this.#databaseHelper.handleQuery({
                                query: "UPDATE prize SET image_link = ? WHERE id_prize = ?",
                                values: [`./uploads/${fileName2}`, 4]
                            });
                        }

                    });
                }
                if(file3.length !== 0) {
                    fileName3 = req.files.image3.name;
                    uploadPath3 = wwwrootPath + `/uploads/${fileName3}`

                    file3.mv(uploadPath3, (err) => {
                        if (err) {
                            console.log(err)
                            return res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: err});
                        } else {
                            image3 = this.#databaseHelper.handleQuery({
                                query: "UPDATE prize SET image_link = ? WHERE id_prize = ?",
                                values: [`./uploads/${fileName3}`, 3]
                            });
                        }

                    })
                }
            }
        });
    }
}

module.exports = UploadFileRoute

