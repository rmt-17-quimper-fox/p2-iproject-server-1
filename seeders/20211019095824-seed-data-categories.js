'use strict';

const categories = require('../Db/categories.json')
module.exports = {
  up: async (queryInterface, Sequelize) => {

     categories.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
   });
   await queryInterface.bulkInsert('Categories', categories, {})
  },

  down: async (queryInterface, Sequelize) => {
 
    await queryInterface.bulkDelete('Categories', null, {});

  }
};
