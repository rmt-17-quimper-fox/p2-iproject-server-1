require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT||3000
const routes = require('./routes')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/', routes)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
