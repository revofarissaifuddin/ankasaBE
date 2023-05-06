const express = require("express");
const router = express.Router();
const {
  InsertAirlines,
  ReadAirlineAll,
  ReadAirlineById,
  UpdateAirlines,
} = require("../controller/controllerAirlines");
const upload = require("../middleware/uploadPhoto");

router.post("/", upload.single("photo"), InsertAirlines);
router.get("/", ReadAirlineAll);
router.get("/:id", ReadAirlineById);
router.put("/update/:id", upload.single("photo"), UpdateAirlines);

module.exports = router;
