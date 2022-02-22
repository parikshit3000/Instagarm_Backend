const router = require("express").Router();


const createPost = require("./Posts/create");
const deletePost = require("./Posts/delete");
const getPost = require("./Posts/get");
const world = require("./Posts/hello");
const likePost = require("./Posts/like");
const updatePost = require("./Posts/update");

router.get("/", world);

// Create Post
router.post("/", createPost);

// Update Post
router.put("/:id", updatePost);

// Delete Post
router.delete("/:id", deletePost)

// Like/Unlike a Post
router.put("/:id/like", likePost);

// Get post
router.get("/:id", getPost);

module.exports = router;