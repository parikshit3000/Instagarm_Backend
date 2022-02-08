const router = require("express").Router();
const Post = require("../models/Post");

// Create a Post
router.post("/", async (req, res) => {
  const newPost = await new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch {
    res.status(500).json(err);
  }
});

// Update a Post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await Post.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Post Successfully Updated!");
    } else {
      res.status(403).json("Update access Denied!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a Post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post Successfully Deleted!");
    } else {
      res.status(403).json("Delete access Denied!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Like/Unlike a Post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Post Liked!");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Post DisLiked!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a Post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get timeline Post (Nested asynchronous fetch)
router.get("/timeline/all", async (req, res) => {
  try {
    const currUser = await User.findById(req.body.userId);
    const currUserPosts = await Post.find({ userId: req.body.userId });
    const friendPosts = await Promise.all(
      currUser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.json(currUserPosts.concat(...friendPosts));
    // res.status(200).json(currUserPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;