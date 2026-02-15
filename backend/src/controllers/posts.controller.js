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
      likes: 0,
      user: {
        avatarUrl: req.body.user.avatarUrl,
        userName: req.body.user.userName,
        userHandle: req.body.user.userHandle,
      },
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.log("SAVE POST ERROR:", error);
    res.status(500).json({ error: "Post could not be saved" });
  }
}

async function getUserPosts(req, res) {
  try {
    const { handle } = req.query;
    console.log("HANDLE BACKEND" + handle);

    const posts = await Post.find({ "user.handle": handle }).sort({ createdAt: -1 });
    console.log(`Searching for: ${handle}`);
    console.log(`Found ${posts.length} posts`);

    res.json(posts);
  } catch (error) {
    console.log("GET USER POSTS POST ERROR:", error);
    res.status(500).json({ error: "Cannot get users posts" });
  }
}

module.exports = { getAllPosts, createPost, toggleLike, getUserPosts };
