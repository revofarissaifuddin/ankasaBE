const express = require("express");
const router = express.Router();
const {
  getUserByID,
  UpdateProfileUsers,
} = require("../controller/controllerUsers");

router.get("/my-users/:id", getUserByID);
router.put("/my-users/:id", UpdateProfileUsers);

module.exports = router;
