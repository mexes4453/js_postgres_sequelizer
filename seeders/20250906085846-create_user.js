'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return await queryInterface.bulkInsert('Users', [
       {
           firstName: 'John',
           lastName: 'doe',
           createdAt: new Date(),
           updatedAt: new Date(),
       },
       {
           firstName: 'Mark',
           lastName: 'Smith',
           createdAt: new Date(),
           updatedAt: new Date(),
       }
       // add more user objects as needed
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('Users', null, {});
  }
};
