const express = require("express");
const { getAllUsers, getUser } = require("../controllers/users.controller");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/user", getUser);
module.exports = router;
