const router = require("express").Router();
const path = require("path");
const fs = require("fs");

router.delete("/image/delete/:image", (req, res) => {
  const { image } = req.params;
  // console.log(image);

  // === delete uploaded image ===
  if (fs.existsSync(`./public/upload/images/${image}`)) {
    fs.unlinkSync(`./public/upload/images/${image}`);
    res.json({ message: "Success" });
  } else {
    res.json({ message: "File not found" });
  }
});

router.delete("/pdf/delete/:pdf", (req, res) => {
  const { pdf } = req.params;
  // console.log(pdf);
  if (fs.existsSync(`./public/upload/pdf/${pdf}`)) {
    fs.unlinkSync(`./public/upload/pdf/${pdf}`);
    res.json({ message: "Success" });
  } else {
    res.json({ message: "File not found" });
  }
});
module.exports = router;
