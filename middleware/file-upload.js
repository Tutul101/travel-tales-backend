const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      const extentsion = MIME_TYPE_MAP[file.mimetype];
      cb(null, `${uuidv4()}.${extentsion}`);
    },
    fileFilter: (req, file, cb) => {
      const isValid = !!MIME_TYPE_MAP(file.mimetype);
      const error = isValid ? null : new Error("Invalid Mime Type");
      cb(error, isValid);
    },
  }),
});

module.exports = fileUpload;
