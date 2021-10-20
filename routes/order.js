const express = require('express')
const OrderController = require('../controllers/controllerOrder')
const router = express.Router()
const authentication = require('../middlewares/authentication')


router.use(authentication)
router.post('/customer/:productId', OrderController.checkout)
router.get('/customer/cart', OrderController.allMyCart)
router.get('/customer/:id', OrderController.detailCart)
router.delete('/customer/:id', OrderController.deleteCart)





module.exports = router