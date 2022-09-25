const express = require('express')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express()

// body-parser
app.use(express.urlencoded({extended: true}))

app.use(adminRoutes)
app.use(shopRoutes)

app.use('/', (req, res, next) => {
  res.status(404).send('<h1>Page not found!</h1>')
}) 

app.listen(3000);