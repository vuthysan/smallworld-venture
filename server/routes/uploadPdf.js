const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// === upload file mangement ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload/pdf");
  },
  filename: (req, file, cb) => {
    // console.log(file);
    // === rename file ===
    cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/upload/pdf", upload.single("pdf"), (req, res) => {
  // console.log(req.file);
  if (!req.file) {
    res.send("There is no pdf to upload");
  }
  //   console.log(req.file);
  res.send(req.file.filename);
});

module.exports = router;
