
const express = require("express");
const router = express.Router();
const { registerUser, loginUser,otp } = require("../controller/controllerAuth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/otp/:id/:code", otp);

module.exports = router;
