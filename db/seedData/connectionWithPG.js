const { Pool, Client } = require('pg')
const credentials = require('../seedData/credentials')
const path = require('path');
require('dotenv').config({  path: path.resolve(__dirname, '../../.env') });

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATA,
  password: process.env.DB_PASS,
  port: process.env.DB_PG_PORT,
})

module.exports = client
