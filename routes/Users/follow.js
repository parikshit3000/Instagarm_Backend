const User = require("../../models/User");

const followUser = async (req, res) => {
  try {
    if (req.body.userId !== req.params.id) {
      const user = await User.findById(req.params.id);
      const currUser = await User.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $push: { followers: req.body.userId },
        });
        await currUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("Following!");
      } else {
        res.status(403).json("You are already a Follower!");
      }
    } else {
      res.status(403).json("Cannot Follow Yourself");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = followUser;