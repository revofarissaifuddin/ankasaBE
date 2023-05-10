const express = require("express");
const router = express.Router();
const {
  InsertTicket,
  ReadTicketAll,
  ReadTicketID,
} = require("../controller/controllerTicket");

router.post("/add", InsertTicket);
router.get("/show-all/", ReadTicketAll);
router.get("/show/:id", ReadTicketID);

module.exports = router;
