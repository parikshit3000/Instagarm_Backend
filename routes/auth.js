const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { response } = require("express");

// Register User
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    response.status(500).json(err);
    console.log(err);
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("Check Username!");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Wrong Password!");
    
    if (user) {
      if (validPassword) {
        res.status(200).json("LogIn Successfull!");
      }
    }
  } catch (err) {
    response.status(500).json(err);
  }
});

module.exports = router;
