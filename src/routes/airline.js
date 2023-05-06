const express = require("express");
const router = express.Router();
const {
  InsertAirlines,
  ReadAirlineAll,
  ReadAirlineById,
  UpdateAirlines,
} = require("../controller/controllerAirlines");

router.post("/", InsertAirlines);
router.get("/", ReadAirlineAll);
router.get("/:id", ReadAirlineById);
router.put("/update/:id", UpdateAirlines);

module.exports = router;
