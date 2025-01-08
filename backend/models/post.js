'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // Define associations here
    }
  }
  Post.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false, // Ensure title is required
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true, // Description is optional
      },
      type: {
        type: DataTypes.ENUM('regular', 'video', 'image', 'gig'),
        allowNull: false, // Type is required
      },
      status: {
        type: DataTypes.ENUM('draft', 'published'),
        defaultValue: 'draft',
      },
    },
    {
      sequelize,
      modelName: 'Post',
      tableName: 'posts', // Explicit table name
      timestamps: true, // Enable createdAt and updatedAt
    }
  );
  return Post;
};
