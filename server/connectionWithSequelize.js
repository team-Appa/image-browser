const { Sequelize } = require('sequelize');
const products = require ('../db/models/products.js');
const images = require ('../db/models/images.js');
const path = require('path');
require('dotenv').config({  path: path.resolve(__dirname, '../.env') });

const connection = new Sequelize('product', process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
  define: {
    timestamps: false
  },
  pool: {
    max: 900,
    min: 0,
    acquire: 3000,
    idle: 1000
  }
})

let ProductsModel = products.factory(connection);
let ImagesModel = images.factory(connection);
ProductsModel.hasMany(ImagesModel, { as: "variations"})
ImagesModel.belongsTo(ProductsModel)

connection
  .authenticate()
  .then(()=>{
    return connection.sync()
  })
  .catch((err)=> {
    console.log(err);
  });

module.exports.ProductsModel = ProductsModel;
module.exports.ImagesModel = ImagesModel;
module.exports.connection = connection;
