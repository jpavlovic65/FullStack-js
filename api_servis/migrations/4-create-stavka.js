'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stavkas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      komad: {
        type: Sequelize.INTEGER
      },     
      auto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'autos',
          key: 'id'
        }
      },     
      narudzbina_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'narudzbinas',
          key: 'id'
        }
      },
      // user_id: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'users',
      //     key: 'id'
      //   }
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Stavkas');
  }
};