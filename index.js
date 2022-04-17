const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
//Import router
const authRoute = require("./routes/auth");
const checkRoute = require("./routes/check");
const verify = require("./routes/verify");

//connect DB
mongoose.connect("DATABASE_CONNECT", { useNewUrlParser: true }, () => {
  console.log("DB connected");
});

app.use(express.json());

//Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/check", checkRoute);

app.listen(3000, () => console.log("server started"));
