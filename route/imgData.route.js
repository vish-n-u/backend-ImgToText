const imgDataController = require("../controller/imageData.controller")
const jwtValidation = require("../validation/jwt.validation")

const multer = require('multer'); // Middleware for handling FormData
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });


module.exports = (app)=>{
    app.post("/imgToText/api/v1/imgData", upload.single('image'),[jwtValidation.verifyJwt],imgDataController.createImgData)
    app.post("/imgToText/api/v1/imgDatas", upload.single('image'),imgDataController.returnImgData)
    app.get("/imgToText/api/v1/imgData/:id",[jwtValidation.verifyJwt],imgDataController.getSingleImageData)
}