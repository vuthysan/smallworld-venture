const router = require("express").Router();
const jwt = require("jsonwebtoken");

// === verify token ===
router.get("/verifyToken", (req, res) => {
  const token = req.cookies.access_token;
  const user = jwt.decode(token, process.env.ACCESS_SECRET);
  res.json(user);
});

// === logout user ===
router.get("/logout", (req, res) => {
  res.cookie("access_token", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: true,
    sameSite: "none",
  });

  res.json({ message: "Logged Out!" });
});

module.exports = router;
