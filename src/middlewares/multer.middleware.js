const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../public"))
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      const nombreFinalDeImagen = `${file.fieldname}-${Date.now()}${ext}`
      cb(null, nombreFinalDeImagen)
    },
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLocaleLowerCase();

      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        cb(new Error("extensión no soportada"), false);
      }
      cb(null, true)
    }
  }),
}) 