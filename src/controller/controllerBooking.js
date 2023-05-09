const { createBooking } = require("../models/bookingModel");
const BookingController = {
  InsertBooking: async (req, res, next) => {
    try {
      const data = {};
      data.id;
      data.users_id = req.payload.id;
      data.tickets_id = req.body.tickets_id;
      data.passanger_id = req.body.tickets_id;
      data.is_paid = req.body.tickets_id;
      data.insurance = req.body.insurance;
      data.subtotal = req.body.subtotal;

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
};
module.exports = BookingController;
