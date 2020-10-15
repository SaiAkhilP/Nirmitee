const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const Valid = require("./validator");
const authRoute = require("./routes/auth");
const meetRoute = require("./routes/meetRoute");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//configuring env file
dotenv.config();

//MongoDB connection
mongoose.connect("mongodb://localhost:27017/authen", { useNewUrlParser: true });
mongoose.connection.on("connected", (err, res) => {
  console.log("Connected to database.");
});
mongoose.connection.on("error", (err) => {
  console.log("err", err);
});

//routes
app.use("/api/user", authRoute);
app.use("/api/meeting", Valid.verifyToken, meetRoute);

app.listen(3000, () => console.log("Server active!"));
