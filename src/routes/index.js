const express = require("express");
const router = express.Router();
const Auth = require("./auth");
const Users = require("./users");

router.use("/auth", Auth);
router.use("/users", Users);

module.exports = router;
