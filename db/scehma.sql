DROP TABLE IF EXISTS users;

DROP TABLE if EXISTS tasks CASCADE;


CREATE TABLE users (
       id SERIAL UNIQUE PRIMARY KEY,
       name VARCHAR(255),
       password_input TEXT
);


CREATE TABLE tasks (
       id SERIAL PRIMARY KEY UNIQUE,
       name VARCHAR(255)
);
