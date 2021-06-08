const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

// === upload file mangement ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload/images");
  },
  filename: (req, file, cb) => {
    // console.log(file);
    // === rename file ===
    cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/upload/image", upload.single("image"), (req, res) => {
  //   console.log(req.file);
  if (!req.file) {
    res.send("There is no image to upload");
  }

  sharp("./" + req.file.path)
    .toBuffer()
    .then((data) => {
      sharp(data)
        // .resize(300, 200)
        .png({ quality: 80 })
        .toFile("./" + req.file.path, () => {
          return res.send(req.file.filename);
        });
    })
    .catch((err) => {
      console.log(err);
    });

  //   console.log(req.file);
  // res.send(req.file.filename);
});

module.exports = router;
