const express = require("express");
const router = express.Router();
const {
  InsertBooking,
  ReadBookingIDUser,
  ReadBookingID,
  UpdateBookingPayment,
} = require("../controller/controllerBooking");
const { protect } = require("../middleware/auth");

router.post('/add', protect, InsertBooking);
router.get("/my-booking", protect, ReadBookingIDUser);
router.get("/booking/:id", protect, ReadBookingID);
router.put("/is_paid/:id", protect, UpdateBookingPayment);
module.exports = router;
