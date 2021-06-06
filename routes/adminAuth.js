const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Valid = require("../validator");
var mongoose = require('mongoose');
var Admin = mongoose.model('Admin'), User = mongoose.model('User');

//Signing Up
router.post("/signup", async (req, res) => {
  //Check input validations
  const { error } = Valid.signupValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  //check if email exists in db
  const checkEmail = await Admin.findOne({ email: req.body.email });
  if (checkEmail) {
    return res.status(400).json({ error: "Email already exists" });
  }
  //encrypting password by hash&salt
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  const user = new Admin({
    name: req.body.name,
    email: req.body.email,
    password,
    role : 'admin'
  });
  user.save().then(data=>{res.json({message : 'Saved', data : data})}).catch(err=>{res.json(err)});
});

//Login
router.post("/signin", async (req, res) => {
  const user = await Admin.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ error: "Wrong/Invalid email." });
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: "Wrong Password" });
  }
  console.log("ADMIN ROUTE : ", user.role)

  //create JWT
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
      role: user.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" }
  );

  res.header("authtoken", token).json({ accessToken: token });
});



//get list of registered users
router.get("/users", Valid.verifyToken, (req,res)=>{
  if(req.user.role==='admin')
  {
  User.find().then(data=>{res.status(200).json({users : data})}).catch(err=>{res.send(500).json(err)})
  }
  else{
    return res.send('Unauthorised')
  }
});

//get users by _id
router.get('/users/:id',Valid.verifyToken,(req,res)=>{
  // console.log(req.params)
  if(req.user.role==='admin')
  {
  User.findById({_id : req.params.id}).then(data=>{res.status(200).json(data)})
  .catch(err=>{res.status(500).send(err)})
}
else{
  return res.send('Unauthorised')
}
})

//update users by _id
router.put('/users/:id',Valid.verifyToken, (req,res)=>{
  if(req.user.role==='admin')
  {
  User.findByIdAndUpdate({_id : req.params.id}, req.body).then(data=>{res.status(200).json('Updated.')})
  .catch(err=>{res.status(500).send(err)})
}
else{
  return res.send('Unauthorised')
}
})

//delete using _id
router.delete('/users/:id',Valid.verifyToken, (req,res)=>{
  if(req.user.role==='admin')
  {
  User.findByIdAndDelete({_id : req.params.id}).then(data=>{res.status(200).json('Deleted.')})
  .catch(err=>{res.status(500).send(err)})
}
else{
  return res.send('Unauthorised')
}
})

module.exports = router;
