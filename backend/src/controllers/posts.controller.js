const Post = require("../models/Post");

// GET all posts
async function getAllPosts(req, res) {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch posts" });
  }
}
//Like or Dislike depends of boolean
async function toggleLike(req, res) {
  try {
    const { id } = req.params;
    const { liked } = req.body; // true or false
    console.log("Toggle like - ID:", id, "Liked:", liked);
    const post = await Post.findByIdAndUpdate(id, { $inc: { likes: liked ? 1 : -1 } }, { new: true });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error("Toggle like error:", error);
    res.status(500).json({ error: "Could not update likes" });
  }
}
// POST create post
async function createPost(req, res) {
  try {
    const newPost = new Post({
      text: req.body.text,
      imgSrc: req.body.imgSrc || "",
      address: req.body.address,
      likes: req.body.likes,
      user: req.body.user || {
        avatarUrl: req.body.avatarUrl,
        username: req.body.user.username,
        handle: req.body.user.handle,
      },
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.log("SAVE POST ERROR:", error);
    res.status(500).json({ error: "Post could not be saved" });
  }
}

module.exports = { getAllPosts, createPost, toggleLike };
