'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('autos',
    [
        {id:"1",naziv:"330i", opis:"M paket opreme", cena: 20000, godiste: 2023, snaga: 190, kubikaza: 1999, model_id:1},     
        {id:"2",naziv:"328i", opis:"Sport paket opreme", cena: 100000, godiste: 2021, snaga: 245, kubikaza: 1999, model_id:1},
        {id: "3", naziv: "550d", opis: "LED farovi i M paket opreme", cena: 60000, godiste: 2022, snaga: 250, kubikaza: 2998, model_id: 2},     
        {id: "4", naziv: "M3", opis: "Sportski Coupe", cena: 80000, godiste: 2023, snaga: 450, kubikaza: 2993, model_id: 1},
        
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('autos', null, {});
  }
};
