'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // No associations needed for now
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 30], // Minimum 3, maximum 30 characters
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true, // Optional
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("admin"),
        defaultValue: "admin", // Default role is admin
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
