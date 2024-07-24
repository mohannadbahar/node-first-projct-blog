const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Blog = sequelize.define('Blog', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

Blog.belongsTo(User, { as: 'author', foreignKey: 'authorId' });
User.hasMany(Blog, { foreignKey: 'authorId' });

module.exports = Blog;
