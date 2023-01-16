const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

//DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const authRoutes = require('./routes/auth');
const application = require('./routes/application');

app.use('/api', authRoutes);
app.use('/api', application);

//error handling for express-jwt authentication
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(port, () => {
  console.log(`Backend is running at port number ${port} ✅`);
});
