const express = require("express");
const router = express.Router();
const { getUserByID, UpdateProfileUsers } = require("../controller/controllerUsers");

router.get("my-users", getUserByID);
router.put("/my-users", UpdateProfileUsers);