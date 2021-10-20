const { User, Product, Category } = require("../models");
const { signToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bCrypt");
const sendEmail = require("../helpers/nodemailer");

class ControllerCustomer {
  static async registerCustomer(req, res, next) {
    try {
      const { name, username, email, password, address, phoneNumber, gender } =
        req.body;
      const payload = {
        name,
        username,
        email,
        password,
        address,
        phoneNumber,
        gender,
        role: "Customer",
      };
      const result = await User.create(payload);
      const content = `Hi ${payload.name}!, your account with email ${payload.email} successfully registered.`;
      const subject = `Information Registered`;
      sendEmail(result, content, subject);
      res
        .status(201)
        .json({ id: result.id, name: result.name, email: result.email });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async loginCustomer(req, res, next) {
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
        console.log(err);
      next(err);
    }
  }
  static async showAllProducts(req, res, next) {
      try {
        const result = await Product.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt', ]},
            order: [['updatedAt', 'ASC']]
        })
      res.status(200).json(result);
      } catch (err) {
        //   console.log(err);
        next(err)
      }
  }
  static async detailProducts(req,res,next) {
      try {
          const productId = Number(req.params.productId)
          if (!productId) {
            throw {name: 'bad request'}
          }
          const result = await Product.findOne({
              where: {id: productId},
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
          })
          res.status(200).json(result);
      } catch (err) {
        //   console.log(err);
          next(err)
      }
  }
}

module.exports = ControllerCustomer;
