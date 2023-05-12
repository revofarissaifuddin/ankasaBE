const pool = require("../config/db");

const createBooking = (data) => {
  const { id, users_id, tickets_id, passanger_id, title, insurance, total, subtotal } =
    data;
  let created_at = new Date().toISOString();
  return new Promise((resolve, reject) =>
    pool.query(
      `INSERT INTO bookings(id, users_id, tickets_id, passanger_id,title, insurance, subtotal, created_at) VALUES('${id}', '${users_id}', '${tickets_id}', '${passanger_id}','${title}', '${insurance}','${total}','${subtotal}','${created_at}')`,
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
const selectBookingId = (id) => {
  return pool.query(`
  SELECT 
    bookings.id, bookings.tickets_id, bookings.is_paid, bookings.insurance, bookings.passanger_id,
    tickets.airline_id, tickets.takeoff, tickets.landing, tickets.transit, tickets.price, tickets.duration, tickets.facilites, tickets.flight_class, tickets.terminal, tickets.gate,
    airlines.airline_name, airlines.photo,
    o.airport_name as origin_name, o.city as origin_city, o.country as origin_country, o.airport_code as origin_code,
    d.airport_name as destination_name, d.city as destination_city, d.country as destination_country, d.airport_code as destination_code
      FROM 
          bookings
      JOIN
          tickets ON tickets.id = bookings.tickets_id
      JOIN
          airlines ON airlines.id = tickets.airline_id
      JOIN
          airports o ON tickets.origin = o.id
      JOIN
          airports d ON tickets.destination = d.id 
      WHERE 
            bookings.id = '${id}'
        `);
};
const selectBookingUserId = (id) => {
  return pool.query(`
  SELECT 
    bookings.id,bookings.users_id, bookings.tickets_id, bookings.is_paid, bookings.insurance, bookings.passanger_id,
    tickets.airline_id, tickets.takeoff, tickets.landing, tickets.transit, tickets.price, tickets.duration, tickets.facilites, tickets.flight_class, tickets.terminal, tickets.gate,
    airlines.airline_name, airlines.photo,
    o.airport_name as origin_name, o.city as origin_city, o.country as origin_country, o.airport_code as origin_code,
    d.airport_name as destination_name, d.city as destination_city, d.country as destination_country, d.airport_code as destination_code
      FROM 
          bookings
      JOIN
          tickets ON tickets.id = bookings.tickets_id
      JOIN
          airlines ON airlines.id = tickets.airline_id
      JOIN
          airports o ON tickets.origin = o.id
      JOIN
          airports d ON tickets.destination = d.id 
      WHERE 
            bookings.users_id = '${id}'`);
};

const updatePayment = (id) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `UPDATE bookings SET is_paid WHERE id='${id}'`,
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
module.exports = {
  createBooking,
  selectBookingId,
  selectBookingUserId,
  updatePayment,
};
