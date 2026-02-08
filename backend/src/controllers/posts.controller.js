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

// POST create post
async function createPost(req, res) {
  try {
    const newPost = new Post({
      text: req.body.text,
      imgSrc: req.body.imgSrc || "",
      user: req.body.user || {
        avatarUrl: req.body.avatarUrl,
        username: req.body.user.username,
        handle: req.body.user.handle,
      },
      location: req.body.location,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.log("SAVE POST ERROR:", error);
    res.status(500).json({ error: "Post could not be saved" });
  }
}

module.exports = { getAllPosts, createPost };
