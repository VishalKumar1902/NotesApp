const express = require("express");
const router = express.Router();

const { login, signup } = require("../controllers/userController");

//register user
router.post("/signup", signup);
//login user
router.post("/login", login);

module.exports = router;
