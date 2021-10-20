const express = require('express')
const OrderController = require('../controllers/controllerOrder')
const router = express.Router()
const authentication = require('../middlewares/authentication')
const { authorizzationCustomer } = require('../middlewares/authorization')


router.use(authentication)
router.post('/customer/:productId', OrderController.checkout)

router.get('/customer/cart', OrderController.allMyCart)
router.get('/customer/:cartId', authorizzationCustomer, OrderController.detailCart)
router.delete('/customer/:cartId', authorizzationCustomer, OrderController.deleteCart)





module.exports = router