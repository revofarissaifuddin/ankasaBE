const { updateProfile, getProfileUsers } = require("../models/usersModel");
const argon2 = require("argon2");
const email = require("../middleware/email");
const UsersController = {
  // show data user by id
  getUserByID: async (req, res, next) => {
    try {
      let data = {
        id: req.payload.id,
      };

      let result = await getProfileUsers(data);
      if (!result) {
        return res
          .status(400)
          .json({ status: 404, message: "Error data user not found" });
      } else {
        res
          .status(200)
          .json({ status: 200, message: "data found", data: result.rows });
      }
    } catch (error) {
      next(error);
    }
  },

  //update profile users
  UpdateProfileUsers: async (req, res, next) => {
    try {
      const id = req.payload.id;
      const data = {};
      data.email = req.body.email;
      data.fullname = req.body.name;
      data.phone = req.body.phone;
      data.city = req.body.city;
      data.address = req.body.address;
      data.postcode = req.body.postcode;

      const updateData = await updateProfile(id, data);
      if (!updateData) {
        return res.status(400).json({
          status: 404,
          message: "Error request data user not found",
        });
      }
      return res
        .status(201)
        .json({ status: 201, message: "update data success" });
    } catch (error) {
      res
        .status(404)
        .json({ status: 404, message: "Error request delete data failed" });
      next(error);
    }
  },
};
module.exports = UsersController;
