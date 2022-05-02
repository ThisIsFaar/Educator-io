const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

mongoose
  .connect("mongodb://localhost/portal")
  .then(() => console.log("connected..."))
  .catch((err) => console.log("not connected", err));

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const authRoutes = require("./routes/auth");

app.use("/api", authRoutes);

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
