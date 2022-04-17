const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
//Import router
const authRoute = require("./routes/auth");

//connect DB
mongoose.connect(
  "mongodb+srv://test:test@cluster0.gahvy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  () => {
    console.log("DB connected");
  }
);

app.use(express.json());

//Route Middlewares
app.use("/api/user", authRoute);

app.listen(3000, () => console.log("server started"));
