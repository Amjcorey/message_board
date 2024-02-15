const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
// const Avatar = require('avatar-initials');

class User extends Model {
  // Checks the password against the encrypted password in the database.
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    initials: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    // Hooks are used so that if a user is created or updated, the password is encrypted before being stored in the database.
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

// const initial_png = Avatar.initialAvatar({
//     initials: 'MC',
//     initial_fg: '#888888',
//     initial_bg: '#f4f6f7',
//     initial_size: 0, // Defaults to height / 2
//     initial_weight: 100,
//     initial_font_family: "'Lato', 'Lato-Regular', 'Helvetica Neue'",
//   });


module.exports = User;
