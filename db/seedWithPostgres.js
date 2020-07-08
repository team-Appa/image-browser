const credentials = require('./credentials')
const { Pool, Client } = require('pg')

const client = new Client({
  user: credentials.username,
  host: credentials.server,
  database: credentials.database,
  password: credentials.password,
  port: 3211,
})

client.connect()
.then(() => console.log("connected successfully")
.then(()=> client.query(""))
.catch(e=> console.log(e));
.finally(()=> client.end());

module.exports.pool = pool;