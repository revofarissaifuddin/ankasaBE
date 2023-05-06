const express = require("express");
const router = express.Router();
const Auth = require("./auth");
const Users = require("./users");
const Airline = require("./airline");

router.use("/auth", Auth);
router.use("/users", Users);
router.use("/airlines", Airline);

module.exports = router;
