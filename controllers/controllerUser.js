const { User, Product, Category} = require("../models");
const { signToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bCrypt");
const sendEmail = require('../helpers/nodemailer')

class ControllerUser {
  static async register(req, res, next) {
    try {
      const { name, username, email, password, address, phoneNumber, gender} =
        req.body;
      const payload = {
        name,
        username,
        email,
        password,
        address,
        phoneNumber,
        gender,
        role: 'Admin'
      };
      const result = await User.create(payload);
      const content = `Hi ${payload.name}!, your account with email ${payload.email} successfully registered.`
      const subject = `Information Registered`
      sendEmail(result, content, subject)
      res.status(201).json({ id: result.id, name: result.name, email: result.email });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const response = await User.findOne({ where: { email: email || null } });
      if (!response) {
        throw { name: "LoginFailed" };
      }
      if (!comparePassword(password, response.password)) {
        throw { name: "LoginFailed" };
      }
      const payload = {
        id: response.id,
        email: response.email,
      };
      const token = signToken(payload);
      res.status(200).json({ acces_token: token });
    } catch (err) {
      next(err);
    }
  }
  static async addProduct(req, res, next) {
    try {
      const { name, price, weight, imageUrl, categoryId } = req.body;
      const {id} = req.user
      const payload = {
        name,
        price: +price,
        weight: +weight,
        imageUrl,
        categoryId: +categoryId,
        authorId: +id
      };
      const newProduct = await Product.create(payload)
      res.status(201).json(newProduct);
    } catch (err) {
      next(err);
    }
  }
  static async getAllProducts(req, res, next) {
    try {
      const result = await Product.findAll(
        {
        attributes: {exclude: ['createdAt', 'updatedAt', ]},
        include: [{
          model: Category,
          attributes: {exclude: ['id', 'createdAt', 'updatedAt']},
        },
        {
          model: User,
          attributes: {exclude: ['createdAt', 'updatedAt', 'id', 'username', 'password', 'address', 'gender', 'role']},
        }
      ]
      }
      );
      res.status(200).json(result);
    } catch (err) {
      next(err)
    }
  }
  static async deleteProduct(req, res, next) {
    try {
      const productId = Number(req.params.productId)
      if(!productId) {
        throw {name: 'bad request'}
      }
      const product = await Product.findOne({ where: { id: productId || null } });
      if (!product) {
        throw {name: 'NotFound'}
      }
      const deleteProduct = await Product.destroy({ where: { id: productId } });
      if(!deleteProduct) {
        throw {name: 'NotFound'}
      }
      res.status(200).json({message: `Product has been Deleted`})
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ControllerUser;
