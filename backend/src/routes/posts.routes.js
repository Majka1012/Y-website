const express = require("express");
const { getAllPosts } = require("../controllers/posts.controller");

const router = express.Router();

router.get("/", getAllPosts);

module.exports = router;
