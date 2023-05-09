const express = require("express");
const router = express.Router();
const {
  InsertAirport,
  ReadAirportAll,
  ReadAirportById,
  UpdateAirport,
  removeDataById,
} = require("../controller/controllerAirport");
const upload = require("../middleware/uploadPhoto");

router.post("/add", InsertAirport);
router.get("/show-all", ReadAirportAll);
router.get("/show/:id", ReadAirportById);
router.put("/update/:id", UpdateAirport);
router.delete("/delete/:id", removeDataById);

module.exports = router;
