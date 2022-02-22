const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const loginUser = require("./Auth/login");
const registerUser = require("./Auth/register");
const deleteUser = require("./Users/delete");
const followUser = require("./Users/follow");
const getUser = require("./Users/get");
const unfollowUser = require("./Users/unfollow");
const updateUser = require("./Users/update");

//----User Routes----//

// Update User
router.put("/:id", updateUser);

// Delete User
router.delete("/:id", deleteUser);

// Get a User
router.get("/:id", getUser);

// Follow a User
router.put("/:id/follow", followUser);

// Unfollow a User
router.put("/:id/unfollow", unfollowUser);


//----Authentication Routes----//

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

module.exports = router;