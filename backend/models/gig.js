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
        type: DataTypes.JSON, // JSON to store "Free" or ticket URL + price
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Gig',
    }
  );
  return Gig;
};
