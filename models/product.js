'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, {foreignKey: 'categoryId'})
      Product.belongsToMany(models.User, {
        through: models.Cart,
        foreignKey: 'productId'
      })
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'name is required'
        },
        notNull: {
          msg: 'name is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'price is required'
        },
        notNull:{
          msg: 'price is required'
        },
        min: {
          args: 1,
          msg: 'price minimum 1'
        }
      }
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'weight is required'
        },
        notNull:{
          msg: 'weight is required'
        },
        min: {
          args: [0],
          msg: "weight can't be 0 "
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'imageurl is required'
        },
        notNull: {
          msg: 'imageurl is required'
        }
      }
    },
    categoryId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'categoryId is required'
        },
        notNull:{
          args: true,
          msg: 'categoryId is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};