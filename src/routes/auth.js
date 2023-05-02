
const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  otp,
  sendOTPEmail,
  verifyChangePassword,
  resetPassword,
} = require("../controller/controllerAuth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/send-otp", sendOTPEmail);
router.get("/verif-otp", verifyChangePassword);
router.put("/reset-password", resetPassword);
router.get("/otp/:id/:code", otp);

module.exports = router;
