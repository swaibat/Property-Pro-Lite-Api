import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = process.env.NODE_ENV === 'test'
  ? new Client({ connectionString: process.env.TESTDB_URL })
  : new Client({ connectionString: process.env.TESTDB_URL });

const users = `CREATE TABLE IF NOT EXISTS
      users (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR (50) NOT NULL,
        lastName VARCHAR (50) NOT NULL,
        email VARCHAR (50)  NOT NULL,
        address VARCHAR (150) NOT NULL,
        phoneNumber VARCHAR (50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        isAgent BOOLEAN DEFAULT false NOT NULL,
        createdOn timestamp without time zone DEFAULT now(),
        last_access VARCHAR (150),
        avatar VARCHAR (150),
        online BOOLEAN DEFAULT false,
        favourite TEXT [] DEFAULT '{}'
    )`;

const property = `CREATE TABLE IF NOT EXISTS
    property(
        id SERIAL PRIMARY KEY,
        createdOn timestamp without time zone DEFAULT now() NOT NULL,
        price FLOAT NOT NULL,
        address VARCHAR (150)  NOT NULL,
        city VARCHAR (100)  NOT NULL,
        state VARCHAR (100)  NOT NULL,
        type VARCHAR (50)  NOT NULL,
        owner VARCHAR (50) NOT NULL,
        imageUrl TEXT [] DEFAULT '{}',
        status VARCHAR (50) DEFAULT 'available' NOT NULL,
        views INT DEFAULT 0
    )`;

    const flags = `CREATE TABLE IF NOT EXISTS
    flags(
        id SERIAL PRIMARY KEY,
        property_id INT NOT NULL,
        reason VARCHAR (100)  NOT NULL,
        description VARCHAR (255)  NOT NULL,
        created_on timestamp without time zone DEFAULT now() NOT NULL
    )`;

    client.connect()

    if(process.env.NODE_ENV === 'test'){
        client.query('DROP TABLE IF EXISTS users');
        client.query('DROP TABLE IF EXISTS property');
        client.query('DROP TABLE IF EXISTS flags');
        client.query(users)
        client.query(property)
        client.query(flags)
    }else{
        client.query(users) 
        client.query(property)
        client.query(flags)
    }
    

export default client;
