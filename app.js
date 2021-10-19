require('dotenv').config()
const express = require('express')
const cors = require('cors')
const ControllerUser = require('./controllers/controllerUser')
const errorHandlers = require('./middlewares/errorHandlers')
const authentication = require('./middlewares/authentication')
const app = express()
const port = process.env.PORT||3000


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.post('/register', ControllerUser.register)
app.post('/login', ControllerUser.login)

app.use(authentication)
app.post('/product', ControllerUser.addProduct)
app.get('/products', ControllerUser.getAllProducts)
app.delete('/product/:productId', ControllerUser.deleteProduct)







app.use(errorHandlers)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
