////////////////////////////////////////////////////////////
/////////////////  TEST FILE ONLY //////////////////////////
////////////////////////////////////////////////////////////

var fs = require('fs');
var csv = require('fast-csv');
const path = require('path');
const pool = require('./connection.js')

const filePath = path.resolve( __dirname, '../dataGeneration/data/products.csv')

pool.connect().then(()=>{
  let counter = 0;

  let csvStream = csv.parseFile(filePath, { headers:true })
  .on("data", function(record){
    csvStream.pause();
    if(counter < 1000000)
    {
      let title = record.title;
      let description = record.description;
      let rating = record.rating;
      pool.query("INSERT INTO products (title, description, rating) \
      VALUES ($1, $2, $3)", [title, description, rating], function(err){
        if (err){
          console.log("www", err)
        }
      })
      ++counter
    }
    csvStream.resume();
  }).on("end", function(){
    console.log("done")
    // pool.end().then (()=>console.log("pool ended"))
  }).on("error", function(err){
    // pool.end().then (()=>console.log("pool ended"))
})

})