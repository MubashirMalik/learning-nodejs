const express = require('express')

const app = express()

app.use('/', (req, res, next) => {
  // console.log(req.url)
  console.log("This always runs!")
  next()
})

app.use('/add-product', (req, res, next) => {
  console.log("In another middleware!")
  res.send("<h1>The Add Product Page")
})

// matches the route starting with /
app.use('/', (req, res, next) => {
  console.log("In another middleware!")
  res.send("<h1>Hello from Express!</h1>")
})

app.listen(3000);