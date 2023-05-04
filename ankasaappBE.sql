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