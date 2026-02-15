const express = require("express");
const { getAllPosts, createPost, toggleLike, getUserPosts } = require("../controllers/posts.controller");

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", createPost);
router.patch("/:id/like", toggleLike);
router.get("/userPosts", getUserPosts);

module.exports = router;
