/* ================================NEW QUERY DATA===================================== */
/* add users table */

CREATE TABLE users(
    id VARCHAR PRIMARY KEY,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    fullname VARCHAR,
    photo VARCHAR DEFAULT NULL,
    phone VARCHAR DEFAULT NULL,
    city VARCHAR DEFAULT NULL,
    address VARCHAR DEFAULT NULL,
    postcode VARCHAR DEFAULT NULL,
    verif INT DEFAULT 0,
    OTP VARCHAR,
    create_at TIMESTAMP,
    update_at TIMESTAMP DEFAULT NULL,
);

CREATE TABLE tickets(
    id SERIAL PRIMARY KEY,
    airline_id VARCHAR REFERENCES airline(id),
    origin VARCHAR REFERENCES airports(id),
	destination VARCHAR REFERENCES airports(id),
	takeoff TIMESTAMP,
    landing TIMESTAMP,
    transit INTEGER,
    price INTEGER DEFAULT NULL,
    duration VARCHAR DEFAULT NULL,
    create_at TIMESTAMP DEFAULT NULL,
    delete_at TIMESTAMP DEFAULT NULL,
);

CREATE Table airlines(
    id SERIAL PRIMARY KEY, 
    airline_name VARCHAR DEFAULT NULL, 
    airline_logo VARCHAR DEFAULT NULL
);

CREATE TABLE airports(
    id SERIAL PRIMARY KEY,
    airport_name VARCHAR,
    city VARCHAR,
    country VARCHAR,
    airport_code VARCHAR
);

CREATE TABLE bookings(
    id SERIAL PRIMARY KEY, 
    users_id VARCHAR,
    tickets_id INTEGER,
    is_paid INTEGER DEFAULT 0,
    title VARCHAR DEFAULT NULL,
    fullname VARCHAR DEFAULT NULL, 
    nationality VARCHAR DEFAULT NULL,
    insurance VARCHAR DEFAULT NULL,
    subtotal INTEGER DEFAULT 0,
    created_at TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE passengers(
    id VARCHAR PRIMARY KEY,
    title VARCHAR,
    fullname VARCHAR,
    nationallity VARCHAR,

)