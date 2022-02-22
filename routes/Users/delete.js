const User = require("../../models/User");

const deleteUser = async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Success! Profile Deleted.");
      console.log("Success! Profile Deleted.");
    } else {
      return res.status(403).json("You are not authorized to Delete Account!");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = deleteUser;