const { Client } = require('pg')
const path = require('path');
require('dotenv').config({  path: path.resolve(__dirname, '../../.env') });
const Products = require('../models/products.js');
const Images = require('../models/images.js');
const connection = require('../models/connectionWithSequelize.js');

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATA_TMP,
  password: process.env.DB_PASS,
  port: process.env.DB_PG_PORT,
})

const clientTwo = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATA,
  password: process.env.DB_PASS,
  port: process.env.DB_PG_PORT,
})


client
  .connect()
  .then(() => {
    console.log("connected to template1")
    return client.query("DROP DATABASE IF EXISTS product")
  })
  .then(() => {
    return client.query("CREATE DATABASE product")
  })
  .then(() => {
    console.log("created products database and close connection")
    return client.end()
  })
  .then(() => {
    return connection.authenticate()
  })
  .then(()=>{
    console.log("connected to product")
    ProductsModel = Products.factory(connection);
    ImagesModel = Images.factory(connection);
    ProductsModel.hasMany(ImagesModel)
    ImagesModel.belongsTo(ProductsModel)
    return connection.sync()
  })
  .then(()=>{
    console.log("insert data into products table")
    const filePath = path.resolve( __dirname, '../dataGenerationPG/data/products.csv')
    console.log("============", filePath);
    return connection.query(`copy products (title, description, rating) FROM '${filePath}' DELIMITER ',' CSV HEADER`)
  })
  .then(()=>{
    console.log("insert data into images table")
    const filePath = path.resolve( __dirname, '../dataGenerationPG/data/variations.csv')
    return connection.query(`copy images ("productId", cost, color, image) FROM '${filePath}' DELIMITER ',' CSV HEADER`)
  })
  .then(()=>{
    return connection.query(`CREATE INDEX idx_images_productId ON images("productId")`)
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    console.log("seeded and close connection\n")
    connection.close()
  })