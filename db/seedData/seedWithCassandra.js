const client = require('./connectionWithCassandra.js')
const path = require('path');

var query = `DROP KEYSPACE IF EXISTS product`;
client.execute(query)
  .then(()=>{
    console.log("connected and clear existing db")
    query = `CREATE KEYSPACE product WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'} AND DURABLE_WRITES = 'true'`;
    return client.execute(query)
  })
  .then(()=>{
    console.log("use product")
    query = `USE product`
    return client.execute(query)
  })
  .then(()=>{
    console.log("created data base product")
    query = `CREATE TABLE products (id int PRIMARY KEY, title text, description text, rating float)`
    return client.execute(query)
  })
  .then(()=>{
    console.log("created images table")
    query = `CREATE TABLE images (productID int, id int, cost float, color text, image text, PRIMARY KEY(productId, id))`
    return client.execute(query)
  })
  .then(()=>{
    // console.log("insert data into product Table")
    // const filePath = path.resolve( __dirname, '../dataGenerationCass/data/products.csv')
    // return client.execute(`COPY products (id, title, description, rating) FROM '${filePath}' WITH DELIMITER = ',' AND HEADER = TRUE`)
  })
  .then(()=>{
    // console.log("insert data into image Table")
    // const filePath = path.resolve( __dirname, '../dataGenerationCass/data/variations.csv')
    // return client.execute(`COPY images (productID, id, cost, color, image) FROM '${filePath}' WITH DELIMITER = ',' AND HEADER = TRUE`)
  })
  .catch((err)=>{
    console.log(err)
  })
  .finally(()=>{
    console.log("complete\n")
    client.shutdown()
  })