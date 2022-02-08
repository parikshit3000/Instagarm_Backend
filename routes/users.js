const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Update User
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Success! Profile Info Updated.");
      console.log("Success! Profile Info Updated.");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You are not authorized to update details!");
  }
});

// Delete User
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Success! Profile Deleted.");
      console.log("Success! Profile Deleted.");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You are not authorized to Delete Account!");
  }
});

// Get a User
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, createdAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Follow a User
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currUser = await User.findById(req.body.userId);
      // const uName = await User.findById(req.params.id, 'username');
      console.log(currUser.username);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $push: { followers: req.body.userId },
          // $push: { followers: { names: currUser.username} },
        });
        await currUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("Following!");
      } else {
        res.status(403).json("You are already a Follower!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Cannot Follow Yourself");
  }
});

// Unfollow a User
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currUser = await User.findById(req.body.userId);
      // const uName = await User.findById(req.params.id, 'username');
      console.log(currUser.username);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $pull: { followers: req.body.userId },
          // $push: { followers: { names: currUser.username} },
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
});

module.exports = router;