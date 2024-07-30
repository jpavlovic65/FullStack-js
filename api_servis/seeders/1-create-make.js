'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
async up (queryInterface, Sequelize) {await queryInterface.bulkInsert('makes',
    [
        {id:"1",naziv:"Series 3", karoserija: "Limuzina", opis:"Klasicna BMW mala serija"},
        {id:"2",naziv:"X3", karoserija: "SUV", opis:"Sportski BMW SUV"},
        {id:"3",naziv:"i4", karoserija: "Limuzina", opis:"Električna BMW serija 4"}
       
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('makes', null, {});
  }
};
