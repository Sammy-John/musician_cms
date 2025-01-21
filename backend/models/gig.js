'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Gig extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }
  Gig.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      venue: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ticketInfo: {
        type: DataTypes.JSON, // JSON to store ticket details
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('draft', 'published'),
        defaultValue: 'draft',
      },
    },
    {
      sequelize,
      modelName: 'Gig',
      tableName: 'Gigs', // Explicitly specify the table name
      timestamps: true,
    }
  );
  return Gig;
};
