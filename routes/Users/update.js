const bcrypt = require("bcrypt");
const User = require("../../models/User");

// Update User
const updateUser = async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
          return res.status(500).json(err);
        }
        try {
          await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
          });
          res.status(200).json("Success! Profile Info Updated.");
          console.log("Success! Profile Info Updated.");
        } catch (err) {
          return res.status(500).json(err);
        }
      } else {
        return res.status(403).json("Password Incorrect!");
      }
    } else {
      return res.status(403).json("You are not authorized to update details!");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = updateUser;