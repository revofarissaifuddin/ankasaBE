const pool = require("../config/db");
/*airlines*/
const CreateAirlines = (data) => {
  const { id, airline_name, photo } = data;
  return new Promise((resolve, reject) =>
    pool.query(
      `INSERT INTO airlines(id,airline_name, photo) VALUES('${id}','${airline_name}','${photo}')`,
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

const updateAirlines = (data) => {
  const { id, airline_name, photo } = data;
  return new Promise((resolve, reject) =>
    pool.query(
      `UPDATE airlines(airline_name, airline_logo) VALUES('${airline_name}','${photo}') WHERE id = '${id}'`,
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

const getAllAirlines = () => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT * from airlines`,
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

const getAirlinesById = (data) => {
  let { id } = data;
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * from airlines WHERE id = '${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

module.exports = {
  CreateAirlines,
  updateAirlines,
  getAllAirlines,
  getAirlinesById,
};
