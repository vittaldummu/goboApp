const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "uploads/")
    },
    filename: function (req, file, callback) {
        let ext = path.extname(file.originalname)
        callback(null, Date.now() + ext)
    }
});

var upload = multer ({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if(
            file.mimetype == "image/jpeg" ||
            file.mimetype == "image/jpg"  ||
            file.mimetype == "image/png"  ||
            file.mimetype == "application/msword"  || //.doc
            file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"  ||  //.docx
            file.mimetype == "video/mp4"  ||
            file.mimetype == "video/mpeg"  ||
            file.mimetype == "application/pdf"  ||
            file.mimetype == "application/vnd.ms-excel"  || //.xls
            file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"  ||    //.xlsx
            file.mimetype == "application/vnd.ms-powerpoint"  ||    //.ppt
            file.mimetype == "application/vnd.openxmlformats-officedocument.presentationml.presentation"    //.pptx
        ){
            callback(null, true)
        } else {
            console.log("only jpg, jpeg or png file is supported");
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 20
    }

});

module.exports = upload