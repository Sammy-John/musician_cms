'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // Define associations here, such as links to media tables
      this.belongsTo(models.Image, { foreignKey: 'mediaId', as: 'image' });
      this.belongsTo(models.Video, { foreignKey: 'mediaId', as: 'video' });
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
        allowNull: false,
      },
      summary: {
        type: DataTypes.STRING(255), // Short snapshot
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT, // Longer description for NewsList
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT, // Full content for NewsItemPage
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM('regular', 'video', 'image', 'gig'),
        allowNull: false,
      },
      mediaId: {
        type: DataTypes.UUID, // Optional link to media
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('draft', 'published'),
        defaultValue: 'draft',
      },
    },
    {
      sequelize,
      modelName: 'Post',
      tableName: 'Posts',
      timestamps: true,
    }
  );

  return Post;
};
