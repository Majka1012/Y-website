// const users = require("../data/dummyUsers");
const users = require("../models/User");

async function getAllUsers(req, res) {
  res.json(users);
}
async function getUser(req, res) {
  try {
    const { userHandle } = req.query;
    // console.log("handle");
    // console.log(userHandle);

    const user = await users.findOne({ userHandle: userHandle });
    console.log("USER: " + user);
    // console.log("Handle: " + userHandle);
    res.json(user);
  } catch (error) {
    console.log("GET USER ERROR:", error);
    res.status(500).json({ error: "Cannot get user" });
  }
}

module.exports = { getAllUsers, getUser };
