'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }
  Image.init(
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('image', 'feature-image'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Image',
    }
  );
  return Image;
};
