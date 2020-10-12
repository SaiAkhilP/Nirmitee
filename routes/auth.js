const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");

//Registration

router.post("/signup", async (req, res) => {
  //check for registered email
  const checkEmail = await User.findOne({ email: req.body.email });
  if (checkEmail) {
    return res.status(400).json({ error: "Email already exists" });
  }

  //encrypting password by hash&salt
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password,
  });

  try {
    const saved = await user.save();
    res.json({ data: saved });
  } catch (error) {
    res.status(400).json({ error });
  }
});

//Login

router.post("/signin", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ error: "Wrong email." });
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: "Password is wrong" });
  }
  res.json({
    message: "Login successful",
  });
});

module.exports = router;
