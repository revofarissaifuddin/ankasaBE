const {
  createTicket,
  selectTicket,
  selectTicketID,
} = require("../models/ticketModel");

const TicketController = {
  InsertTicket: async (req, res, next) => {
    try {
      const data = {
        airline_id: req.body.airline_id,
        origin: req.body.origin,
        destination: req.body.destination,
        takeoff: req.body.takeoff,
        landing: req.body.landing,
        transit: req.body.transit,
        facilites: req.body.facilites,
        price: req.body.price,
        duration: req.body.duration,
        flight_class: req.body.flight_class,
        terminal: req.body.terminal,
        gate: req.body.gate
      };
      
      const addTicket = await createTicket(data);
      if (!addTicket) {
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
        message: "Error request input data ticket failed",
      });
      next(error);
    }
  },

  ReadTicketAll: async (req, res, next) => {
    try {
      const { searchBy, searchValue} = req.query;
      const data = {
        searchBy: searchBy || "destination_country",
        search: searchValue || ""
      };
    
      const showTicketAll = await selectTicket(data);
      if (!showTicketAll) {
        res
          .status(404)
          .json({ status: 400, message: "Error request data not found" });
      }
      res.status(200).json({
        status: 200,
        message: "data ticket found",
        data: showTicketAll.rows,
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: "Error request get all ticket failed",
      });
      next(error);
    }
  },

  ReadTicketID: async (req, res, next) => {
    try {
      const id = req.params.id
      const showTicketID = await selectTicketID(id);
      if (!showTicketID) {
        res
          .status(404)
          .json({ status: 400, message: "Error request data not found" });
      }
      res.status(200).json({
        status: 200,
        message: "data ticket found",
        data: showTicketID.rows,
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: "Error request get all ticket failed",
      });
      next(error);
    }
  },
};
module.exports = TicketController;
