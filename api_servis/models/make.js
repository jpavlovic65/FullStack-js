'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Make extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Auto}) {
      this.hasMany(Auto, {foreignKey: "model_id", as: "model"});
    }
  }
  Make.init({
    naziv: DataTypes.STRING,
    karoserija: DataTypes.STRING,
    opis: DataTypes.STRING,
    naziv: {
      type: DataTypes.STRING(120),
      unique: true,
      allowNull: true
    }, 
    opis: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    karoserija:{
      type: DataTypes.STRING(120),
        allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Make',
  });
  return Make;
};