const { Sequelize } = require('sequelize');
const credentials = require('./credentials');
const products = require ('../db/models/products.js')
const images = require ('../db/models/images.js')

const connection = new Sequelize('product', credentials.username, credentials.password, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  define: {
    timestamps: false
  },
  pool: {
    max: 900,
    min: 0,
    acquire: 30000,
    idle: 10000
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
    console.log("yoo", err);
  });

module.exports.ProductsModel = ProductsModel;
module.exports.ImagesModel = ImagesModel;
module.exports.connection = connection;
