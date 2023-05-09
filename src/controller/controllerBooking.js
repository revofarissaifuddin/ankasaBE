const {
  createBooking,
  selectBookingId,
  selectBookingUserId,
} = require("../models/bookingModel");
const BookingController = {
  InsertBooking: async (req, res, next) => {
    try {
      const data = {
        id,
        users_id: req.payload.id,
        tickets_id: req.body.tickets_id,
        passanger_id: req.body.tickets_id,
        is_paid: req.body.tickets_id,
        insurance: req.body.insurance,
        subtotal: req.body.subtotal,
      };

      const addBooking = await createBooking(data);
      console.log(addBooking);
      if (!addBooking) {
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
        message: "Error request input data airline failed",
      });
      next(error);
    }
  },

  ReadBookingIDUser: async (req, res, next) => {
    try {
      const id = req.payload.id;
      const showTicketAll = await selectBookingUserId(id);
      if (!showTicketAll) {
        res
          .status(404)
          .json({ status: 400, message: "Error request data not found" });
      }
      res.status(200).json({
        status: 200,
        message: "data booking found",
        data: showTicketAll.rows,
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: "Error request booking failed",
      });
      next(error);
    }
  },

  ReadBookingID: async (req, res, next) => {
    try {
      const id = req.params.id;
      const showBookingID = await selectBookingId(id);
      if (!showBookingID) {
        res
          .status(404)
          .json({ status: 400, message: "Error request data not found" });
      }
      res.status(200).json({
        status: 200,
        message: "data booking found",
        data: showBookingID.rows,
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: "Error request server failed",
      });
      next(error);
    }
  },
};
module.exports = BookingController;
