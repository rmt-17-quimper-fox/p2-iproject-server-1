const { User } = require("../models");
const {signToken} = require('../helpers/jwt')
const {comparePassword} = require('../helpers/bCrypt')

class ControllerUser {
  static async register(req, res, next) {
    try {
      const { name, username, email, password, address, phoneNumber, gender } = req.body;
      const payload = {
        name,
        username,
        email,
        password,
        address,
        phoneNumber,
        gender,
      };
      const result = await User.create(payload)
      res.status(201).json({id: result.id, name:result.name, email:result.email})
    } catch (err) {
        next(err)
    }
  }
  static async login(req, res, next) {
      try {
        const { email, password } = req.body
        const response = await User.findOne( { where: { email: email || null}})
        if (!response ) {
           throw{name: 'LoginFailed'}
        }
        if (!comparePassword(password, response.password)) {
            throw{name: 'LoginFailed'}
        }
        const payload = {
            id: response.id,
            email: response.email
        }
        const token = signToken(payload)
        res.status(200).json({acces_token: token})
      } catch (err) {
          next(err)
      }
  }
}

module.exports = ControllerUser;
