const express = require("express");
const router = express.Router();
const Auth = require("./auth");
const Users = require("./users");
const Airline = require("./airline");
const Ticket = require("./ticket");
const Airport = require("./airport")

router.use("/auth", Auth);
router.use("/users", Users);
router.use("/airlines", Airline);
router.use("/tickets", Ticket);
router.use("/airports", Airport);

module.exports = router;
