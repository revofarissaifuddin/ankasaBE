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

router.get("/verif-otp", verifyChangePassword);
router.get("/otp/:id/:code", otp);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/send-otp", sendOTPEmail);
router.put("/reset-password", resetPassword);

module.exports = router;
