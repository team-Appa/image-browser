const { Model, DataTypes } = require('sequelize');

const attributes ={
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey:true
  },
  title: {
    type: DataTypes.STRING,
    allowNull:false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull:false
  },
  rating: {
     type: DataTypes.FLOAT,
      allowNull:false
  }
}

const factory = (sequelize) => {
  class Products extends Model{}
  Products.init(attributes, { sequelize, modelName:'products' });
  return Products;
}

module.exports.factory = factory;