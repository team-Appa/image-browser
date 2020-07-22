const {Sequelize, QueryTypes } = require('sequelize');
const path = require('path');
require('dotenv').config({  path: path.resolve(__dirname, '../../.env') });


const sequelize = new Sequelize('product', process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
  define: {
    timestamps: false
  }
})

module.exports = sequelize;