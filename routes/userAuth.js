const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Valid = require("../validator");
var mongoose = require('mongoose');
var User = mongoose.model('User');

//Signing Up
router.post("/signup", async (req, res) => {
  //Check input validations
  const { error } = Valid.signupValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  //check if email exists in db
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
    role : 'user'
  });
  user.save().then(data=>{res.json({message : 'Saved', data : data})}).catch(err=>{res.json(err)});
});

//Login
router.post("/signin", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ error: "Wrong/Invalid email." });
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: "Wrong Password" });
  }

  //create JWT
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
      role : user.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" }
  );

  res.header("authtoken", token).json({ accessToken: token });
});

module.exports = router;
