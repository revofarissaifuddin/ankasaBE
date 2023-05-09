const express = require("express");
const router = express.Router();
const { InsertBooking } = require("../controller/controllerBooking");
const { protect } = require("../middleware/auth");

router.post('/add', protect, InsertBooking);
router.get("/my-booking/:id", protect);
router.get("/booking/:id",);
module.exports = router;
