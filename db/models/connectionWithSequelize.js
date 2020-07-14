const {Sequelize, QueryTypes } = require('sequelize');
const credentials = require('../seedData/credentials')

const sequelize = new Sequelize('product', credentials.username, credentials.password, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  define: {
    timestamps: false
  }
})

module.exports = sequelize;