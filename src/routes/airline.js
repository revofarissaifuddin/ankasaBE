const express = require("express");
const router = express.Router();
const {
  InsertAirlines,
  ReadAirlineAll,
  ReadAirlineById,
  UpdateAirlines,
  removeDataById,
} = require("../controller/controllerAirlines");
const upload = require("../middleware/uploadPhoto");

router.post("/add", upload.single("photo"), InsertAirlines);
router.get("/show-all", ReadAirlineAll);
router.get("/show/:id", ReadAirlineById);
router.put("/update/:id", upload.single("photo"), UpdateAirlines);
router.delete("/delete/:id", removeDataById);

module.exports = router;
