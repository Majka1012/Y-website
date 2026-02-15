// const users = require("../data/dummyUsers");
const users = require("../models/User");

async function getAllUsers(req, res) {
  res.json(users);
}
async function getUser(req, res) {
  try {
    const { handle } = req.query;
    const user = await users.find({ "user.handle": handle });
    console.log("USERS: " + user);
    console.log("Handle: " + handle);
    res.json(user);
  } catch (error) {
    console.log("GET USER ERROR:", error);
    res.status(500).json({ error: "Cannot get user" });
  }
}

module.exports = { getAllUsers, getUser };
