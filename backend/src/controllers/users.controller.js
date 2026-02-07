const users = require("../data/dummyUsers");

function getAllUsers(req, res) {
  res.json(users);
}

module.exports = { getAllUsers };
