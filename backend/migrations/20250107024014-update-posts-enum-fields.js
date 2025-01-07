'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Update the `type` column to ENUM
    await queryInterface.changeColumn('Posts', 'type', {
      type: Sequelize.ENUM('regular', 'video', 'image', 'gig'), // Add "regular" to ENUM
      allowNull: false,
    });

    // Update the `status` column to ENUM
    await queryInterface.changeColumn('Posts', 'status', {
      type: Sequelize.ENUM('draft', 'published'), // Add "draft" and "published" to ENUM
      allowNull: false,
      defaultValue: 'draft', // Set default value for `status`
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert the `type` column to STRING
    await queryInterface.changeColumn('Posts', 'type', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Revert the `status` column to STRING
    await queryInterface.changeColumn('Posts', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
