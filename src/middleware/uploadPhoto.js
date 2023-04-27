const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    filename: function (req, res, cb) {
        const uniq = Date.now() + Math.round(Math.random() * 1E9);
        cb(null, uniq + ".png");
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        req.fileValidationError = "File type not supported";
        cb(null, false);
    }
};
const upload = multer({
    storage,
    limits: { fileSize: 10 * Math.pow(1024, 4) },
    fileFilter: fileFilter
});

module.exports = upload;
