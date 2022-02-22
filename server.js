const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require('mongoose'),
  dotenv = require('dotenv'),
  helmet = require('helmet'),
  morgan = require('morgan');

const userRoute = require('./routes/index2');
const authRoute = require('./routes/index2');
const postRoute = require('./routes/index');

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function (req, res) {
  console.log("Server started at port 3000");
});

mongoose.connect(process.env.MONGO_URI,  { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log("Connected to MongoDB");
});

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// Routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);