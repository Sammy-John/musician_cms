'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Posts', 'mediaId', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'Images', // Correct table name
        key: 'id', // Primary key in the referenced table
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Posts', 'mediaId');
  },
};
