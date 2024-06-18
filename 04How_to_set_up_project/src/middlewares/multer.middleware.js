import multer from "multer";
//Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.

//Diskstorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage }); //DOUBT STORAGE
