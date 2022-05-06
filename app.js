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
  .then(() => console.log("Database connected ✅"))
  .catch((err) => console.log("Database connectivity problem occur", err));

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const authRoutes = require("./routes/auth");
const application  = require("./routes/application");

app.use("/api", authRoutes);
app.use("/api", application);

//error handling for express-jwt authentication
app.use( (err, req, res, next) =>  {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});

app.listen(port, () => {
  console.log(`Backend is running at port number ${port} ✅`);
});
