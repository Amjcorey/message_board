const User = require('./User');
const Topic = require('./Topic');
const Post = require('./Post');

Topic.hasMany(Post, {
  foreignKey: 'topic_id',

});

Post.belongsTo(Topic, {
  foreignKey: 'topic_id',
});

User.hasMany(Topic, {
  foreignKey: 'user_id',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Topic, Post};

