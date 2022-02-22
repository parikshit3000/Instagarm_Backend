const User = require("../../models/User");
const bcrypt = require("bcrypt");
const { response } = require("express");

const loginUser = async (req, res) => {
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
};
module.exports = loginUser;