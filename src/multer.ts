import multer = require("multer");
import environment from "./config/environment";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, environment.uploadDir)
    },
})

const multerUpload = multer({storage: storage})

export default multerUpload