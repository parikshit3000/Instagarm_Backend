const Post = require("../../models/Post");

const createPost = async (req, res) => {
  try {
    const newPost = await new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = createPost;