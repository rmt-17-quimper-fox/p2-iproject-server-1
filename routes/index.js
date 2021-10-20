const express = require('express')
const errorHandler = require('../middlewares/errorHandlers')
const router = express.Router()
const admin = require('./admin')
const customer = require('./customer')

router.use('/admin', admin)
router.use('/customer', customer)

router.use(errorHandler)
module.exports = router