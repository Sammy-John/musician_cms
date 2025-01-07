'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid'); // Import UUID library

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("password123", 10); // Change the password as needed
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: uuidv4(), // Generate a UUID
          username: "admin",
          email: "admin@example.com",
          password: hashedPassword,
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", { username: "admin" }, {});
  },
};
