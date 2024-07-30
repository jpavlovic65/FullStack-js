'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {await queryInterface.bulkInsert('narudzbinas',
    [
        {id:"1",status:"U obradi", adresa: "Kneza Milosa 23", telefon:"+381 65 43294 21",ime:"Petrovic Darko"},
        {id:"2",status:"U dolazku", adresa: "Knez Mihajlova 3", telefon:"+381 62 87932 00",ime:"Nikolic Milos"},
        {id:"3",status:"U salonu", adresa: "Kralja Petra 15", telefon:"+381 63 65745 34",ime:"Puzin Dragan"}
       
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('narudzbinas', null, {});
  }
};
