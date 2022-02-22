// // Get timeline Post (Nested asynchronous fetch)
// router.get("/timeline/all", async (req, res) => {
//   try {
//     const currUser = await User.findById(req.body.userId);
//     const currUserPosts = await Post.find({ userId: req.body.userId });
//     const friendPosts = await Promise.all(
//       currUser.following.map((friendId) => {
//         return Post.find({ userId: friendId });
//       })
//     );
//     res.json(currUserPosts.concat(...friendPosts));
//     // res.status(200).json(currUserPosts.concat(...friendPosts));
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });