const express = require("express");
const router = express.Router();
const {
  InsertBooking,
  ReadBookingIDUser,
  ReadBookingID,
} = require("../controller/controllerBooking");
const { protect } = require("../middleware/auth");

router.post('/add', protect, InsertBooking);
router.get("/my-booking/:id", protect, ReadBookingIDUser);
router.get("/booking/:id", protect, ReadBookingID);
module.exports = router;
