const {
  CreateAirlines,
  getAllAirlines,
  getAirlinesById,
  updateAirlines,
} = require("../models/airlinesModel");
const cloudinary = require("../config/photo");
const AirlinesController = {
  InsertAirlines: async (req, res, next) => {
    try {
      const imageUrl = await cloudinary.uploader.upload(req.file.path, {
        folder: "airlines",
      });
      if (!imageUrl) {
        res.status(404).json({
          status: 404,
          message: "input data failed, failed to upload logo",
        });
      }
      const data = {};
      data.airline_name = req.body.airline_name;
      data.photo = imageUrl.secure_url;

      const addAirline = await CreateAirlines(data);
      console.log(addAirline);
      if (!addAirline) {
        return res.status(404).json({
          status: 404,
          message: "Error input data failed",
        });
      }
      return res.status(200).json({
        status: 200,
        message: "input data success"
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: "Error request input data airline failed",
      });
      next(error);
    }
  },

  ReadAirlineAll: async (req, res, next) => {
    try {
      const showAirlineAll = await getAllAirlines();
      if (!showAirlineAll) {
        res
          .status(404)
          .json({ status: 400, message: "Error request data not found" });
      }
      res.status(200).json({
        status: 200,
        message: "data airline found",
        data: showAirlineAll.rows,
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: "Error request get all airline failed",
      });
      next(error);
    }
  },

  ReadAirlineById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const showAirlineByID = await getAirlinesById(id);
      if (!showAirlineByID) {
        res
          .status(404)
          .json({ status: 400, message: "Error request data not found" });
      }
      res.status(200).json({
        status: 200,
        message: "data airline found",
        data: showAirlineByID.rows,
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: "Error request get all airline failed",
      });
      next(error);
    }
  },

  UpdateAirlines: async (req, res, next) => {
    try {
      const imageUrl = await cloudinary.uploader.upload(req.file.path, {
        folder: "airlines",
      });
      if (!imageUrl) {
        res.status(404).json({
          status: 404,
          message: "update data failed, failed to upload logo",
        });
      }
      
      const id = req.params.id;
      const data = {};
      data.airline_name = req.body.airline_name;
      data.photo = imageUrl.secure_url;

      const updateAirline = await updateAirlines(id, data);
      if (!updateAirline) {
        return res.status(404).json({
          status: 404,
          message: "Error update data failed",
        });
      }
      return res.status(201).json({
        status: 200,
        message: "update data success",
        data: `name :${airline_name}`,
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: "Error request update data airline failed",
      });
      next(error);
    }
  },
};
module.exports = AirlinesController;
