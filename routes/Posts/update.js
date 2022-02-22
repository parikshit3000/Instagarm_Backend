const Post = require("../../models/Post");

const updatePost = async (req, res) => {
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
};

module.exports = updatePost;