const {User} = require('../models')
const {verifyToken} = require('../helpers/jwt')

const authentication = async (req, res, next) => {
    try {
      const {acces_token: token} = req.headers;
      //verifikasi token
      const payload = verifyToken(token)
      //validasi ke user
      const foundUser = await User.findOne({
          where: {
              id: payload.id,
              email: payload.email
          }
      })
      //user tidak ada di database
      if (!foundUser) {
          throw {name: 'user cant acces'}
      }
      //kasih penanda
      req.user = {
          id: foundUser.id,
          email: foundUser.email,
          role: foundUser.role
      }

      //boleh acces
      next()
        
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = authentication;