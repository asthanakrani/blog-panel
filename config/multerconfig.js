const multer = require('multer');
const path = require('path');
// Define storage options
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload'); // Use the dynamic directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const upload = multer({storage : storage})

module.exports = upload;
