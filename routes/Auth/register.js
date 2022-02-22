const User = require("../../models/User");
const bcrypt = require("bcrypt");
const { response } = require("express");

const registerUser = async (req, res) => {
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
};

module.exports = registerUser;