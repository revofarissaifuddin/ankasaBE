const express = require("express");
const router = express.Router();
const {
  getUserByID,
  UpdateProfileUsers,
  UpdatePhotoPorfile,
} = require("../controller/controllerUsers");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/uploadPhoto");

router.get("/show-users/", protect, getUserByID);
router.put("/update-users/", protect, UpdateProfileUsers);
router.put("/update-users/photo/",protect,upload.single("photo"),UpdatePhotoPorfile);

module.exports = router;
