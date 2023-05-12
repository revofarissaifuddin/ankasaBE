const {
  createBooking,
  selectBookingId,
  selectBookingUserId,
  updatePayment,
} = require("../models/bookingModel");
const BookingController = {
  InsertBooking: async (req, res, next) => {
    try {
      const data = {
        users_id: req.payload.id,
        tickets_id: req.body.tickets_id,
        title: req.body.title,
        insurance: req.body.insurance,
        subtotal: req.body.subtotal,
        total: req.body.subtotal + 2,
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
        message: "Error request input data booking failed",
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

  UpdateBookingPayment: async (req, res, next) => {
    try {
      const data = {
        id: req.body.id,
        is_paid: req.body.is_paid,
      };
      const update_Payment = await updatePayment(data);
      if (!update_Payment) {
        res
          .status(404)
          .json({ status: 400, message: "Error request data not found" });
      }
      res.status(200).json({
        status: 200,
        message: "update payment success",
        data: update_Payment.rows,
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
