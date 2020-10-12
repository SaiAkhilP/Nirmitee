const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const authRoute = require("./routes/auth");

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
app.listen(3000, () => console.log("Console active!"));
