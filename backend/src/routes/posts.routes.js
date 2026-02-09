const express = require("express");
const { getAllPosts, createPost, toggleLike } = require("../controllers/posts.controller");

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", createPost);
router.patch("/:id/like", toggleLike);
module.exports = router;
