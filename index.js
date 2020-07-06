const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const register = require("./Controllers/register");
const signin = require("./Controllers/signin");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

//connect to db
mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true }, () => {
  console.log("connected to db");
});

//middlewares
app.use(cors());
app.use(bodyParser.json());

//routes
app.get("/", (req, res) => res.send("Hello World!"));
app.post("/register", (req, res) => {
  register.handleRegister(req, res, bcrypt);
});
app.post("/signin", (req, res) => {
  signin.handleSignIn(req, res, bcrypt);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
