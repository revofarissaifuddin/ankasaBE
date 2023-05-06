const express = require("express");
const router = express.Router();
const {
  getUserByID,
  UpdateProfileUsers,
  UpdatePhotoPorfile,
} = require("../controller/controllerUsers");
const { protect } = require("../middleware/auth");

router.get("/my-users/", protect, getUserByID);
router.put("/my-users/", protect, UpdateProfileUsers);
router.put("/my-users/photo/", protect, UpdatePhotoPorfile);

module.exports = router;
