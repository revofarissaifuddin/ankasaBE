const express = require("express");
const router = express.Router();
const {
  CreateAirlines,
  updateAirlines,
  getAllAirlines,
  getAirlinesById,
} = require("../controller/controllerAirlines");

router.post("/",CreateAirlines);
router.get("/", getAllAirlines);
router.get("/:id", getAirlinesById);
router.put("/update/:id", updateAirlines);

module.exports = router;
