const { updateAirlines } = require("../models/airlinesModel");
const {
  createAirport,
  getAllAirport,
  getAirportsById,
  updateAirport,
  deleteAirportById,
} = require("../models/airportModel");
const AirportController = {
  InsertAirport: async (req, res, next) => {
    try {
      const data = {
        id,
        airport_name: req.body.airport_name,
        city: req.body.city,
        country: req.body.country,
        airport_code: req.body.airport_code,
      };

      const addAirport = await createAirport(data);
      if (!addAirport) {
        return res.status(404).json({
          status: 404,
          message: "Error input data failed",
        });
      }
      return res.status(200).json({
        status: 200,
        message: "input data success",
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: "Error request input data failed",
      });
      next(error);
    }
  },

  ReadAirportAll: async (req, res, next) => {
    try {
      const showAirportAll = await getAllAirport();
      if (!showAirportAll) {
        res
          .status(404)
          .json({ status: 400, message: "Error request data not found" });
      }
      res.status(200).json({
        status: 200,
        message: "data airport found",
        data: showAirportAll.rows,
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: "Error request get all airport failed",
      });
      next(error);
    }
  },

  ReadAirportById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const showAirportsById = await getAirportsById(id);
      if (!showAirportsById) {
        res
          .status(404)
          .json({ status: 400, message: "Error request data not found" });
      }
      res.status(200).json({
        status: 200,
        message: "data airport found",
        data: showAirportsById.rows,
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: "Error request get all airport failed",
      });
      next(error);
    }
  },
  UpdateAirport: async (req, res, next) => {
    try {
      const data = {
        id : req.params.id,
        airport_name: req.body.airport_name,
        city: req.body.city,
        country: req.body.country,
        airport_code: req.body.airport_code,
      };
      
      const updateAirportt = await updateAirport(id, data);
      if (!updateAirportt) {
        return res.status(404).json({
          status: 404,
          message: "Error update data failed",
        });
      }
      return res.status(200).json({
        status: 200,
        message: "update data success",
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: "Error request update data airline failed",
      });
      next(error);
    }
  },
  removeDataById: async (req, res, next) => {
    try {
      const id = req.payload.id;
      const removeData = await deleteAirportById(id);
      if (!removeData) {
        res
          .status(404)
          .json({ status: 404, message: "Error request delete data failed" });
      }
      res.status(200).json({
        status: 200,
        message: "delete data success",
      });
    } catch (error) {
      res
        .status(404)
        .json({ status: 404, message: "Error request delete data failed" });
      next(error);
    }
  },
};
module.exports = AirportController;
