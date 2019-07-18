import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// ternary operator
const client = new Client({ connectionString: process.env.DATABASE_URL });


const users = `CREATE TABLE IF NOT EXISTS
      users (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR (50) NOT NULL,
        lastName VARCHAR (50) NOT NULL,
        email VARCHAR (50)  NOT NULL,
        address VARCHAR (150) NOT NULL,
        phoneNumber VARCHAR (50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        isAgent BOOLEAN DEFAULT false NOT NULL
       )`;

const property = `CREATE TABLE IF NOT EXISTS
    property(
        id SERIAL PRIMARY KEY,
        createdOn timestamp without time zone DEFAULT now() NOT NULL,
        owner INT NOT NULL,
        price FLOAT NOT NULL,
        address VARCHAR (150)  NOT NULL,
        city VARCHAR (100)  NOT NULL,
        state VARCHAR (100)  NOT NULL,
        type VARCHAR (50)  NOT NULL,
        imageUrl VARCHAR (500)  NOT NULL,
        status VARCHAR (50) DEFAULT 'available' NOT NULL
    )`;
const flags = `CREATE TABLE IF NOT EXISTS
    flags(
        id SERIAL PRIMARY KEY,
        propertyId INT NOT NULL,
        reason VARCHAR (100)  NOT NULL,
        description VARCHAR (255)  NOT NULL,
        createdOn timestamp without time zone DEFAULT now() NOT NULL
    )`;


const delUser = 'DROP TABLE IF EXISTS users';
const delproperty = 'DROP TABLE IF EXISTS property';
const delflags = 'DROP TABLE IF EXISTS flags';

client.connect()
  .then(() => client.query(users))
  .then(() => client.query(property))
  .then(() => client.query(flags))

export default client;
