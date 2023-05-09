const {
  createTicket,
  selectTicket,
  selectTicketID,
} = require("../models/ticketModel");

const TicketController = {
  InsertTicket: async (req, res, next) => {
    try {
      const data = {};
      data.id;
      data.airline_id = req.body.airline_id;
      data.origin = req.body.origin;
      data.destination = req.body.destination;
      data.takeoff = req.body.takeoff;
      data.landing = req.body.landing;
      data.transit = req.body.transit;
      data.facilites = req.body.facilites;
      data.price = req.body.price;
      data.time = req.body.time;
      data.flight_class = req.body.flight_class;
      data.terminal = req.body.terminal;
      data.gate = req.body.gate;
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
      const showTicketAll = await selectTicket();
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
};
module.exports = TicketController;
