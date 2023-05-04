const express = require("express");
const router = express.Router();
const Auth = require("./auth");

router.use("/auth", Auth);

module.exports = router;
