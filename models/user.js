'use strict';
const {
  Model
} = require('sequelize');
const { hashingPaswword } = require('../helpers/bCrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Product, {
        through: models.Cart,
        foreignKey: 'userId'
      })
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name is required'
        },
        notNull: {
          msg: 'Name is required'
        }
      }
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "username is already exists",
      },
      validate: {
        notEmpty: {
          msg: 'Username is required'
        },
        notNull: {
          msg: 'Username is required'
        }
      }
    },
    email:{
      type: DataTypes.STRING,
       allowNull: false,
       unique: {
        msg: "email is already exists",
      },
       validate: {
         notEmpty: {
           msg: 'Email is required'
         },
         notNull: {

           msg: 'Email is required'
         },
         isEmail: {

           msg: 'must be Email'
         }
       }
    },
    password: {
      type: DataTypes.STRING,
       allowNull: false,
       validate: {
         notEmpty: {

           msg: 'Password is required'
         },
         notNull: {

           msg: 'Password is required'
         }
       }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
         msg: 'Address is required'
        },
        notNull: {
         msg: 'Address is required'
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
         msg: 'Phone Number is required'
        },
        notNull: {
         msg: 'Phone Number is required'
        }
      }
    },
    gender:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
         msg: 'Gender is required'
        },
        notNull: {
         msg: 'Gender is required'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = hashingPaswword(user.password)
      } 
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};