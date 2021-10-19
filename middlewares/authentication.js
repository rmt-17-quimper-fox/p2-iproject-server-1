const {User} = require('../models')
const {verifyToken} = require('../helpers/jwt')

const authentication = async (req, res, next) => {
    try {
      if (!req.headers.access_token) {
        throw { name: "JsonWebTokenError" };
      } else {
        const { access_token: accessToken } = req.headers;
        const payload = verifyToken(accessToken);
        const userEmail = payload.email;
        const findUser = await User.findOne({
          where: {
            email: userEmail,
          },
        });
        if (!findUser) {
          throw { name: "Forbidden" };
        } else {
          req.user = {
            id: findUser.id,
            email: findUser.email,
          };
  
          next();
        }
      }
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = authentication;