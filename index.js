const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const verifyToken = require("./routes/tokenValidator");

dotenv.config();
const app = express();

const authRoute = require("./routes/auth");
const meetRoute = require("./routes/meetRoute");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Mongo connection
mongoose.connect("mongodb://localhost:27017/authen", { useNewUrlParser: true });
mongoose.connection.on("connected", (err, res) => {
  console.log("Connected to database.");
});
mongoose.connection.on("error", (err) => {
  console.log("err", err);
});

//routes
app.use("/api/user", authRoute);

app.use("/api/meeting", verifyToken, meetRoute);

app.listen(3000, () => console.log("Server active!"));
