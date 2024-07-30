'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {await queryInterface.bulkInsert('stavkas',
    [
        {id:"1",komad:2, auto_id: 1, narudzbina_id:1},
        {id:"2",komad:1, auto_id: 2, narudzbina_id:1},
        {id:"3",komad:1, auto_id: 3, narudzbina_id:2},
        {id:"4",komad:3, auto_id: 4, narudzbina_id:3},
        {id:"5",komad:1, auto_id: 2, narudzbina_id:2}
       
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('stavkas', null, {});
  }
};
