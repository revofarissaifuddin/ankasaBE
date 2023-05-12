const pool = require("../config/db");

const createTicket = (data) => {
  const {
    airline_id,
    origin,
    destination,
    takeoff,
    landing,
    transit,
    facilites,
    price,
    duration,
    flight_class,
    terminal,
    gate,
  } = data;
  let create_at = new Date().toISOString();
  return new Promise((resolve, reject) =>
    pool.query(
      `INSERT INTO tickets(airline_id,origin,destination,takeoff,landing,transit,facilites,duration,price,flight_class,terminal,gate,create_at) VALUES('${airline_id}','${origin}','${destination}','${takeoff}','${landing}','${transit}','${facilites}','${duration}','${price}','${flight_class}','${terminal}','${gate}','${create_at}')`,
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

const selectTicket = () => {
  return pool.query(
    `
      SELECT 
    tickets.id, tickets.takeoff, tickets.landing, tickets.transit,tickets.facilites, tickets.price, tickets.duration, tickets.flight_class,tickets.terminal,tickets.gate,
    airlines.airline_name as airlines_name, airlines.photo as airlines_logo,
    o.airport_name as origin_name, o.city as origin_city, o.country as origin_country, o.airport_code as origin_code,
    d.airport_name as destination_name, d.city as destination_city, d.country as destination_country, d.airport_code as destination_code
      FROM 
          tickets
      JOIN
          airlines ON airlines.id = tickets.airline_id
      JOIN
          airports o ON tickets.origin = o.id
      JOIN
          airports d ON tickets.destination = d.id 
        `
  );
};
/* const selectTicket = () => {
  return pool.query(
    `SELECT airlines.airline_name, airlines.photo,
      tickets.takeoff, tickets.landing, tickets.transit,tickets.facilites, tickets.price, tickets.time, tickets.flight_class,tickets.terminal,tickets.gate,
      FROM tickets
      JOIN airlines ON tickets.airlines_id = airlines.id
    `
  );
};
 */
const selectTicketID = (id) => {
  return pool.query(
    `
    SELECT 
    tickets.id, tickets.takeoff, tickets.landing, tickets.transit,tickets.facilites, tickets.price, tickets.duration, tickets.flight_class,tickets.terminal,tickets.gate,
    airlines.airline_name as airlines_name, airlines.photo as airlines_logo,
    o.airport_name as origin_name, o.city as origin_city, o.country as origin_country, o.airport_code as origin_code,
    d.airport_name as destination_name, d.city as destination_city, d.country as destination_country, d.airport_code as destination_code
      FROM 
          tickets
      JOIN
          airlines ON airlines.id = tickets.airline_id
      JOIN
          airports o ON tickets.origin = o.id
      JOIN
          airports d ON tickets.destination = d.id
      WHERE
        tickets.id = '${id}'
        `
  );
};

module.exports = {
  createTicket,
  selectTicket,
  selectTicketID,
};
