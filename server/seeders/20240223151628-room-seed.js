'use strict';
const fs = require("fs")
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
   const room = await JSON.parse(fs.readFileSync("./data/rooms.json", "utf8"))
                .map((el) => {
                  el.createdAt = new Date()
                  el.updatedAt = new Date()
                  return el
                })
    await queryInterface.bulkInsert('Rooms', room, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Rooms', null, {})
  }
};
