'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stavka extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Auto,Narudzbina,User}) {
      this.belongsTo(Auto, {foreignKey: "auto_id", as: "auto"});
      this.belongsTo(Narudzbina, {foreignKey: "narudzbina_id", as: "narudzbina"});
     // this.belongsTo(User, {foreignKey: "user_id", as: "user"});
    }
  }
  Stavka.init({
    komad: DataTypes.INTEGER,
    auto_id: DataTypes.INTEGER,
    narudzbina_id: DataTypes.INTEGER,
    auto_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    narudzbina_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // user_id: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false
  // }, 
  }, {
    sequelize,
    modelName: 'Stavka',
  });
  return Stavka;
};