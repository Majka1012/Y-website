const express = require("express");
const { getAllPosts, createPost, toggleLike } = require("../controllers/posts.controller");

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", createPost);
router.patch("/", toggleLike);
module.exports = router;
