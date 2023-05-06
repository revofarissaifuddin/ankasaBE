const express = require("express");
const router = express.Router();
const {
  getUserByID,
  UpdateProfileUsers,
  UpdatePhotoPorfile,
} = require("../controller/controllerUsers");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/uploadPhoto");

router.get("/my-users/", protect, getUserByID);
router.put("/my-users/", protect, UpdateProfileUsers);
router.put("/my-users/photo/",protect,upload.single("photo"),UpdatePhotoPorfile);

module.exports = router;
