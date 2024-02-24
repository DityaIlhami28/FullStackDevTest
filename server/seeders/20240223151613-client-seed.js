'use strict';
const fs = require("fs");
const { hashPass } = require("../helper/bcrypt");

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
   const client = await JSON.parse(fs.readFileSync("./data/clients.json", "utf8"))
                  .map((el) => {
                    el.password = hashPass(el.password)
                    el.createdAt = new Date()
                    el.updatedAt = new Date()
                    return el
                  })
    await queryInterface.bulkInsert('Clients', client, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Clients', null, {})
  }
};
