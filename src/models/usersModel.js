const pool = require("../config/db");

//auth model
const createUser = (data) => {
  const { email, fullname, password, id, otp } = data;
  let create_at = new Date().toISOString();
  return new Promise((resolve, reject) =>
    pool.query(
      `INSERT INTO users(id,email,fullname,password,otp,create_at) VALUES('${id}','${email}','${fullname}','${password}','${otp}','${create_at}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const findUser = (email) => {
  return new Promise((resolve, reject) =>
    pool.query(`SELECT * FROM users WHERE email='${email}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const selectUserById = (data) => {
  return new Promise((resolve, reject) =>
    pool.query(`SELECT * FROM users WHERE id='${data}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const verifyUser = (id) => {
  return new Promise((resolve, reject) =>
    pool.query(`UPDATE users SET verif=1 WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const sendOtp = (email, otp) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `UPDATE users SET otp = '${otp}' WHERE email = '${email}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const getOTP = (email, otp) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT * FROM users WHERE email = '${email}' AND otp = '${otp}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const changePassword = (email, password) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `UPDATE users SET password = '${password}' WHERE email = '${email}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

//users model
const updateProfile = (id, data) => {
  const { email, fullname, phone, city, address, postcode } = data;
  let time = new Date().toISOString();
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users SET email='${email}', fullname='${fullname}', phone='${phone}', city='${city}', address='${address}', postcode='${postcode}', update_at='${time}' WHERE id='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const updatePhotoProfile = (id, data) => {
  const { photo } = data;
  let time = new Date().toISOString();
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users SET photo='${photo}', update_at='${time}' WHERE id='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const getProfileUsers = (data) => {
  let { id } = data;
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM users WHERE id = '${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

module.exports = {
  createUser,
  findUser,
  selectUserById,
  verifyUser,
  sendOtp,
  getOTP,
  changePassword,
  updateProfile,
  updatePhotoProfile,
  getProfileUsers,
};
