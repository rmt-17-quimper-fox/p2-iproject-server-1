
const {Cart, Product} = require('../models')
const authorization = async (req,res,next) => {
    try { 
        const {role} = req.user
        if ( role !== 'Admin' ) {
            throw{name: 'Unauthorized'}
        }
        next()
    } catch (err) {
        next(err)
    }
}

const authorizationAdmin = async (req, res, next) => {
    try {
        const { id } = req.user
        const productId = Number(req.params.productId);
        const product = await Product.findOne({ where: { id: productId || null } });
        if(id !== product.authorId) {
            throw {name: 'CustUnauthorized'}
        }
          next()
      } catch (err) {
          console.log(err);
          next(err)
      }
}

const authorizzationCustomer = async (req, res, next) => {
    try {
      const { id } = req.user
      const cartId = Number(req.params.cartId);
        // console.log(id, '<<<<<<<==========');
      const cart = await Cart.findOne({ where: { id: cartId || null } });
      if(id !== cart.userId) {
          throw {name: 'CustUnauthorized'}
      }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = {
    authorization,
    authorizzationCustomer,
    authorizationAdmin
}