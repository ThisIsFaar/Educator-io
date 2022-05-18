const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

mongoose
  .connect(process.env.DB)
  .then(() => console.log("Database connected ✅"))
  .catch((err) => console.log("Database connectivity problem occur", err));

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use(express.static(`client/build`));
app.get(`*`, (req, res) => {
res.sendFile(path.join(__dirname + `/client/build/index.html`));
});
// if (process.env.NODE_ENV === `production` || process.env.NODE_ENV === `staging`) {
//  }

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
