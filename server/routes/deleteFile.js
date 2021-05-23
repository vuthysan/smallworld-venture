const router = require("express").Router();
const path = require("path");
const fs = require("fs");

router.delete("/image/delete/:image", (req, res) => {
  const { image } = req.params;
  // console.log(image);

  // === delete uploaded image ===
  if (fs.existsSync(`./public/upload/${image}`)) {
    fs.unlinkSync(`./public/upload/${image}`);
    res.json({ message: "Success" });
  } else {
    res.json({ message: "File not found" });
  }
});

module.exports = router;
