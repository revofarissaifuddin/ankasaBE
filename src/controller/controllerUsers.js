const {
  updateProfile,
  getProfileUsers,
  selectUserById,
  updatePhotoProfile,
} = require("../models/usersModel");
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
      let id = req.payload.id;
      let {
        rows: [users],
      } = await selectUserById(id);

      if (!users) {
        return res.status(404).json({
          status: 404,
          message: `User not found`,
        });
      }

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
        .json({ status: 404, message: "Error request update data failed" });
      next(error);
    }
  },

  //Update Photo Profile User
  UpdatePhotoPorfile: async (req, res, next) => {
    try {
      const imageUrl = await cloudinary.uploader.upload(req.file.path, {
        folder: "photo",
      });
      if (!imageUrl) {
        res.status(404).json({
          status: 404,
          message: "input data failed, failed to upload foto",
        });
      }
      const data = {photo:imageUrl.secure_url}
      const updatePhoto = await updatePhotoProfile(data);
      if (!updatePhoto) {
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
};
module.exports = UsersController;
