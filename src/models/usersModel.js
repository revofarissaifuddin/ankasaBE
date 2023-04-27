const pool = require("../config/db");

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
module.exports = {
  createUser,
  findUser,
  selectUserById,
  verifyUser,
};
