const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication')
const {authorization} = require('../middlewares/authorization')
const ControllerUser = require('../controllers/controllerUser')

router.post('/register', ControllerUser.register)
router.post('/login', ControllerUser.login)

router.use(authentication)
router.post('/product', ControllerUser.addProduct)
router.get('/products', ControllerUser.getAllProducts)
router.delete('/product/:productId', authorization, ControllerUser.deleteProduct)

module.exports = router