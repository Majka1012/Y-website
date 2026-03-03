const express = require("express");
const { getAllUsers, getUser, updateUser } = require("../controllers/users.controller");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/user", getUser);
router.put("/user", updateUser);
module.exports = router;
