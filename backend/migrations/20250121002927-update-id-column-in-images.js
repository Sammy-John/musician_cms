'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Images', 'id', {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Images', 'id', {
      type: Sequelize.INTEGER, // Revert to the previous type
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    });
  },
};
