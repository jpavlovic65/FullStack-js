'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  
  async up (queryInterface, Sequelize) {await queryInterface.bulkInsert('users',
    [
        {
          username: "admin",
          email: "admin@test.raf",
          password: "$2b$10$iBNKsc3FmodOD/.E6ZAYZeyOQN3InFGVJq9Fw25jaa9WCyDT5wi52"
      }
      
       
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
