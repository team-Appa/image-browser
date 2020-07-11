////////////////////////////////////////////////////////////
/////////////////  TEST FILE ONLY //////////////////////////
////////////////////////////////////////////////////////////

var fs = require('fs');
const path = require('path');
const pool = require('./connection.js')

const filePath = path.resolve( __dirname, '../dataGeneration/data/variations.csv')

console.log(filePath)
pool.connect()
.then(()=>{
 return pool.query(`COPY images ("productId", cost, color, image) FROM '${filePath}' DELIMITER ',' CSV HEADER`)
})
.then(()=>{
  return pool.end()
})

