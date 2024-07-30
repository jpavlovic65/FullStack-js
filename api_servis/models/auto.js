'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Auto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Make,Stavka}) {
      this.belongsTo(Make, {foreignKey: "model_id", as: "model"});
      this.hasMany(Stavka, {foreignKey: "auto_id", as: "auto"});

    }
  }
  Auto.init({
    naziv: DataTypes.STRING,
    opis: DataTypes.STRING,
    cena: DataTypes.INTEGER,
    godiste: DataTypes.INTEGER,
    snaga: DataTypes.INTEGER,
    kubikaza: DataTypes.INTEGER,
    model_id: DataTypes.INTEGER,

      naziv: {
          type: DataTypes.STRING(120),
          unique: true,
          allowNull: false
      }, 
      opis: {
          type: DataTypes.TEXT,
          allowNull: true
      }, 
      cena: {
          type: DataTypes.INTEGER,
          allowNull: true
      }, 
      godiste: {
        type: DataTypes.INTEGER,
        allowNull: false
      }, 
      snaga: {
        type: DataTypes.INTEGER,
        allowNull: false
      }, 
      kubikaza: {
        type: DataTypes.INTEGER,
        allowNull: false
      }, 
     model_id: {
          type: DataTypes.INTEGER,
          allowNull: false
       }
  
  }, {
    sequelize,
    modelName: 'Auto',
  });
  return Auto;
};