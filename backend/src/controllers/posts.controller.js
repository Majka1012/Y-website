const posts = require("../data/dummyPosts");

function getAllPosts(req, res) {
  res.json(posts);
}

module.exports = { getAllPosts };
