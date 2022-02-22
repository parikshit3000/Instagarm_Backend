const User = require("../../models/User");

const unfollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currUser = await User.findById(req.body.userId);
      // const uName = await User.findById(req.params.id, 'username');
      console.log(currUser.username);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $pull: { followers: req.body.userId },
        });
        await currUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("UnFollowed!");
      } else {
        res.status(403).json("You are not a Follower!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Cannot UnFollow Yourself");
  }
};

module.exports = unfollowUser;