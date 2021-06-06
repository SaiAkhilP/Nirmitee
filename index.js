const express = require("express");
const mongoose = require("mongoose");
require('./models/model');
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const Valid = require("./validator");
const authRoute = require("./routes/userAuth"), adminAuth = require("./routes/adminAuth");
const ClothesRoute = require("./routes/clothes")
const app = express(), PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('uploads'));


//configuring env file
dotenv.config();

//MongoDB connection
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("connected", (err, res) => {
  console.log("Connected to database.");
});
mongoose.connection.on("error", (err) => {
  console.log("err", err);
});

//routes
app.get('/', (req,res)=>{
  res.send('API active!')
})

//user authenication
app.use("/api/user", authRoute);

//admin authentication & authorisation
app.use("/api/admin", adminAuth);

//authenticated clothes route
app.use("/api/clothes", Valid.verifyToken,  ClothesRoute);


app.listen(process.env.PORT, (err) =>{if (err) console.log("Error in server setup")
console.log("Server listening on ",process.env.PORT);})
