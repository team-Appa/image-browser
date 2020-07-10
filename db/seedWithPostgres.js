const { Client } = require('pg')
const credentials = require('./credentials')
const Products = require('./models/products.js');
const Images = require('./models/images.js');
const connection = require('./models/connection.js');

const clientOne = new Client({
  user: credentials.username,
  host: credentials.server,
  database: credentials.database,
  password: credentials.password,
  port: 5432,
})

clientOne
  .connect()
  .then(() => {
    console.log("connected to template1")
    return clientOne.query("CREATE DATABASE products")
  })
  .then(() => {
    console.log("created Database and close connection")
    return clientOne.end()
  })
  .then(() => {
    return connection.authenticate()
  })
  .then(()=>{
    console.log("connected to products")
    ProductsModel = Products.factory(connection);
    ImagesModel = Images.factory(connection);
    ProductsModel.hasMany(ImagesModel)
    ImagesModel.belongsTo(ProductsModel)
    return connection.sync()
  })
  .then(()=>{

  })
  .catch((e) => {
    console.error("****problem****", e)
  })
  .finally(() => {
    console.log("seeded and close connection")
    connection.close()
  })