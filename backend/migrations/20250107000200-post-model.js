'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Posts', 'summary', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
    await queryInterface.addColumn('Posts', 'content', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },
  down: async (queryInterface, Sequelize) => {
    // Check if table exists before attempting to remove columns
    const tableExists = await queryInterface.sequelize.query(
      `SELECT to_regclass('public.Posts');`
    );

    if (tableExists[0][0].to_regclass) {
      await queryInterface.removeColumn('Posts', 'summary');
      await queryInterface.removeColumn('Posts', 'content');
    }
  },
};
