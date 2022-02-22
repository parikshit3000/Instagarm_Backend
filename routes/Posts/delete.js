const Post = require("../../models/Post");

const deletePost = async (req, res) => {
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
};

module.exports = deletePost;