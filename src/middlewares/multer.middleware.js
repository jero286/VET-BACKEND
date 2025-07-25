const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLocaleLowerCase();
    if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
      return cb(new Error("extensión no soportada"), false);
    }
    cb(null, true);
  },
});
