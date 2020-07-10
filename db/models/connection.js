const Sequelize = require('sequelize');
const credentials = require('../credentials')

const sequelize = new Sequelize('products', credentials.username, credentials.password, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  define: {
    timestamps: false
  }
})

module.exports = sequelize;