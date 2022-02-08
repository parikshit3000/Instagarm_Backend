const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require('mongoose'),
  dotenv = require('dotenv'),
  helmet = require('helmet'),
  morgan = require('morgan');

const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

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

// Test route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);