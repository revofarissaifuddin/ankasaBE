const express = require("express");
const router = express.Router();
const {
  InsertTicket,
  ReadTicketAll,
} = require("../controller/controllerTicket");

router.post("/add", InsertTicket);
router.get("/show", ReadTicketAll);

module.exports = router;
