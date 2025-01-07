module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Posts", "type", {
      type: Sequelize.ENUM("regular", "video", "image", "gig"),
      allowNull: false,
    });
    await queryInterface.changeColumn("Posts", "status", {
      type: Sequelize.ENUM("draft", "published"),
      allowNull: false,
      defaultValue: "draft",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Posts", "type", {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn("Posts", "status", {
      type: Sequelize.STRING,
    });
  },
};
