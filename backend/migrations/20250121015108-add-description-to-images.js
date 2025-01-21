'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Images', 'description', {
      type: Sequelize.STRING,
      allowNull: true, // Optional field
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Images', 'description');
  },
};
