const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication')
const ControllerCustomer = require('../controllers/controllerCustomer')

router.post('/register', ControllerCustomer.registerCustomer)
router.post('/login', ControllerCustomer.loginCustomer)

router.use(authentication)
router.get('/products', ControllerCustomer.showAllProducts)
router.get('/product/:productId', ControllerCustomer.detailProducts)






module.exports = router