const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Blog = require('./Blog');

const Comment = sequelize.define('Comment', {
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

Comment.belongsTo(User, { as: 'user', foreignKey: 'userId' });
Comment.belongsTo(Blog, { as: 'blog', foreignKey: 'blogId' });
User.hasMany(Comment, { foreignKey: 'userId' });
Blog.hasMany(Comment, { foreignKey: 'blogId' });

module.exports = Comment;
