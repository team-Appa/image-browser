var fs = require('fs');
var csv = require('fast-csv');
const path = require('path');
const pool = require('./connection.js')

const filePath = path.resolve( __dirname, '../dataGeneration/data/products.csv')

console.log(filePath)
pool.connect()
.then(()=>{
 return pool.query(`COPY products (title, description, rating) FROM '/Users/orlandohui/Documents/HackReactor/image-browser/db/dataGeneration/data/products.csv' DELIMITER ',' CSV HEADER`)
})
.then(()=>{
  console.log("yooo")

})

