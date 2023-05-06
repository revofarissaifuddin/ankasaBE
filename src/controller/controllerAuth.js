const {
  findUser,
  createUser,
  selectUserById,
  verifyUser,
  sendOtp,
  getOTP,
  changePassword,
} = require("../models/usersModel");
const { v4: uuidv4 } = require("uuid");
const argon2 = require("argon2");
const {
  generateToken,
  refreshGenerateToken,
} = require("../helpers/generateToken");
const email = require("../middleware/email");

const AuthController = {
  //function post/add/register data users
  registerUser: async (req, res) => {
    // cek users
    let {
      rows: [users],
    } = await findUser(req.body.email);
    if (!req.body.email || !req.body.password || !req.body.name) {
      return res.status(404).json({ status: 404, message: "Enter ture data" });
    } else if (users) {
      return res.status(401).json({
        status: 401,
        message: "Your email has been registered, please login",
      });
    }

    // register users/add data users
    let id = uuidv4();
    let otp = Math.floor(100000 + Math.random() * 900000);
    let data = {
      id,
      email: req.body.email,
      password: await argon2.hash(req.body.password),
      fullname: req.body.name,
      otp,
    };

    let register = await createUser(data);

    if (!register) {
      return res.status(401).json({ status: 401, message: "register failed" });
    }

    try {
      // let url = `http://${process.env.BASE_URL}:${process.env.PORT}/auth/otp/${id}/${otp}`;
      let url = `http://${process.env.BASE_URL}:${process.env.PORT}/auth/otp/${id}/${otp}`;
      let sendEmail = email(req.body.email, otp, url, req.body.name);
      if (sendEmail == "email not send") {
        return res
          .status(404)
          .json({ status: 404, message: "register failed, email not send" });
      }
      return res.status(201).json({
        status: 201,
        message: "register sucsess, please check your email",
      });
    } catch (error) {
      console.log("reg gagal", error);
      return res.status(404).json({ status: 404, message: "register failed" });
    }
  },

  // function login user
  loginUser: async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res
        .status(404)
        .json({ status: 404, message: "Enter data correctly" });
    }

    let {
      rows: [users],
    } = await findUser(req.body.email);

    if (!users) {
      return res.status(404).json({
        status: 404,
        message: "login failed, password of email false",
      });
    }

    let verifyPassword = await argon2.verify(users.password, req.body.password);
    //https://www.geeksforgeeks.org/jwt-authentication-with-refresh-tokens/
    let data = users;
    delete data.password;
    let token = generateToken(users);
    let refreshToken = refreshGenerateToken(users);
    if (verifyPassword) {
      users.token = token;
      users.refreshToken = refreshToken;
      delete users.password;
      delete users.otp;
      delete users.verif;
      delete users.created_at;
      /* if (!users.verif) {
        return res.status(404).json({
          status: 404,
          message: "Login failed, please check your email to verify",
        });
      } */
      return res
        .status(200)
        .json({ status: 200, message: "login sucsess", data: users });
    }

    return res.status(404).json({ status: 404, message: "login failed" });
  },
  // function otp user
  otp: async (req, res) => {
    let userId = req.params.id;
    let otpUser = req.params.code;

    if (!userId || !otpUser) {
      return res
        .status(404)
        .json({ status: 404, message: "input your otp verification" });
    }

    let {
      rows: [users],
    } = await selectUserById(userId);

    if (!users) {
      return res.status(404).json({ status: 404, message: "user not found" });
    }

    if (users.otp == otpUser) {
      let verif = await verifyUser(userId);
      if (verif) {
        return res
          .status(201)
          .json({ status: 201, message: "verification user sucsess" });
      } else {
        return res
          .status(404)
          .json({ status: 404, message: "verification user failed" });
      }
    } else {
      return res.status(404).json({ status: 404, message: "otp user failed" });
    }
  },
  //send otp forgot passwod
  sendOTPEmail: async (req, res, next) => {
    try {
      if (!req.body.email) {
        res
          .status(404)
          .json({ status: 404, message: "Please fill your email" });
      } else {
        let {
          rows: [users],
        } = await findUser(req.body.email);
        if (users) {
          let otp = Math.floor(100000 + Math.random() * 900000);
          let inputOTP = await sendOtp(req.body.email, otp);
          if (!inputOTP) {
            res.status(404).json({ status: 404, message: "Otp user failed" });
          } else {
            try {
              let sendEmail = email(req.body.email, otp);
              if (sendEmail == "email not send") {
                res
                  .status(404)
                  .json({ status: 404, message: "Failed to send email" });
              } else {
                res
                  .status(200)
                  .json({ status: 200, message: "Please check your email" });
              }
            } catch (error) {
              res.status(404).json({ status: 404, error: error.message });
            }
          }
        } else {
          res.status(404).json({ status: 404, message: "User not found" });
        }
      }
    } catch (error) {
      next(error);
    }
  },
  //verifPassword
  verifyChangePassword: async (req, res, next) => {
    try {
      if (!req.body.email || !req.body.otp) {
        res
          .status(404)
          .json({ status: 404, message: "Please fill your email and OTP" });
      } else {
        let findEmail = await getOTP(req.body.email, req.body.otp);
        if (!findEmail.rows[0]) {
          res
            .status(404)
            .json({ status: 404, message: "Your email or OTP wrong" });
        } else {
          res.status(200).json({
            status: 200,
            message: "Confirm success",
            data: findEmail.rows,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  },
  //resetPassword
  resetPassword: async (req, res, next) => {
    try {
      if (!req.body.password || !req.body.email) {
        res
          .status(404)
          .json({ status: 404, message: "Please fill all column" });
      } else {
        let password = await argon2.hash(req.body.password);
        let reset = await changePassword(req.body.email, password);
        if (!reset) {
          res
            .status(404)
            .json({ status: 404, message: "Reset password failed" });
        } else {
          res
            .status(200)
            .json({ status: 200, message: "Reset password success" });
        }
      }
    } catch (error) {
      next(error);
    }
  },
};
module.exports = AuthController;
