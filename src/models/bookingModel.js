const pool = require("../config/db");

const createBooking = (data) => {
  const {
    users_id,
    tickets_id,
    passanger_id,
    is_paid,
    insurance,
    subtotal,
  } = data;
  let create_at = new Date().toISOString();
  return new Promise((resolve, reject) =>
    pool.query(
      `INSERT INTO bookings(users_id, tickets_id, passanger_id, is_paid, insurance, subtotal,create_at) VALUES('${users_id}','${tickets_id}','${passanger_id}', '${is_paid}', '${insurance}','${subtotal}'','${create_at}')`,
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
    bookings.id, bookings.tickets_id, bookings.is_paid, bookings.insurance, bookings.subtotal, 
    tickets.airline_id, tickets.takeoff, tickets.landing, tickets.transit, tickets.price, tickets.time, tickets.facilites, tickets.flight_class, tickets.terminal, tickets.gate,
    airlines.airline_name, airlines.photo,
    airport_ar.airport_name as origin_name, airport_ar.city as origin_city, airport_ar.country as origin_country, airport_ar.airport_code as origin_code,
    a2.name as destination_name, a2.city as destination_city, a2.country as destination_country, a2.airport_code as destination_code
    FROM
      bookings
    JOIN tickets ON tickets.id = bookings.tickets_id
    JOIN airlines ON airlines.id = tickets.airline_id
    JOIN airports as airport_ar ON airport_ar.id = tickets.origin
    JOIN airports as airport_dt ON airport_dt.id = tickets.destination
    WHERE bookings.id ='${id}'`);
};

const selectBookingUserId = (id) => {
  return pool.query(`
  SELECT 
    bookings.id, bookings.tickets_id, bookings.is_paid, bookings.insurance, bookings.subtotal, 
    tickets.airline_id, tickets.takeoff, tickets.landing, tickets.transit, tickets.price, tickets.time, tickets.facilites, tickets.flight_class, tickets.terminal, tickets.gate,
    airlines.airline_name, airlines.photo,
    airport_ar.airport_name as origin_name, airport_ar.city as origin_city, airport_ar.country as origin_country, airport_ar.airport_code as origin_code,
    a2.name as destination_name, a2.city as destination_city, a2.country as destination_country, a2.airport_code as destination_code
    FROM
      bookings
    JOIN tickets ON tickets.id = bookings.tickets_id
    JOIN airlines ON airlines.id = tickets.airline_id
    JOIN airports as airport_ar ON airport_ar.id = tickets.origin
    JOIN airports as airport_dt ON airport_dt.id = tickets.destination
    WHERE bookings.users_id ='${id}'`);
};
module.exports = { createBooking, selectBookingId, selectBookingUserId };
