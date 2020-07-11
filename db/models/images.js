const { Model, DataTypes } = require('sequelize');

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey:true
  },
  color: {
    type: DataTypes.STRING,
    allowNull:false
  },
  image: {
    type: DataTypes.STRING,
    allowNull:false
  },
  cost: {
     type: DataTypes.FLOAT,
      allowNull:false
  }
}

const factory = (sequelize) => {
  class Images extends Model{}
  Images.init(attributes, { sequelize, modelName:'images' });
  return Images;
}

module.exports.factory = factory;