const { Pool, Client } = require('pg')
const credentials = require('../seedData/credentials')

const pool = new Client({
  user: credentials.username,
  host: credentials.server,
  database: "products",
  password: credentials.password,
  port: 5432,
})

module.exports = pool
