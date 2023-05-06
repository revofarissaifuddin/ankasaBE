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
    id VARCHAR PRIMARY KEY,
    airline_id VARCHAR,
    departure_city VARCHAR,
	arrival_city VARCHAR,
	departure_country VARCHAR,
	arrival_country VARCHAR,
    departure_date TIMESTAMP,
    arrival_date TIMESTAMP,
    transit VARCHAR,
    facilities INTEGER,
    price DECIMAL(12,2),
    create_at TIMESTAMP,
    delete_at TIMESTAMP DEFAULT NULL,
);

CREATE Table airlines(
    id VARCHAR PRIMARY KEY, 
    airline_name VARCHAR DEFAULT NULL, 
    airline_logo VARCHAR DEFAULT NULL
);

CREATE TABLE bookings(
    id VARCHAR PRIMARY KEY, 
    users_id VARCHAR,
    tickets_id VARCHAR,
    passanger_id VARCHAR,
    is_paid VARCHAR,
    insurance VARCHAR,
    subtotal VARCHAR,
    created_at TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE passengers(
    id VARCHAR PRIMARY KEY,
    title VARCHAR,
    fullname VARCHAR,
    nationallity VARCHAR,

)