'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Narudzbina extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Stavka}) {
      this.hasMany(Stavka, {foreignKey: "narudzbina_id", as: "narudzbina"});
    }
  }
  Narudzbina.init({
    status: DataTypes.STRING,
    adresa: DataTypes.STRING,
    telefon: DataTypes.STRING,
    ime: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Narudzbina',
  });
  return Narudzbina;
};