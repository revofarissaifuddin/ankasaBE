const express = require("express");
const router = express.Router();
const {
  InsertTicket,
  ReadTicketAll,
  ReadTicketID,
} = require("../controller/controllerTicket");

router.post("/add", InsertTicket);
router.get("/", ReadTicketAll);
router.get("/show/:id", ReadTicketAll);

module.exports = router;
