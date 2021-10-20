const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication')
const ControllerCustomer = require('../controllers/controllerCustomer')

router.post('/register', ControllerCustomer.registerCustomer)
router.post('/login', ControllerCustomer.loginCustomer)




module.exports = router