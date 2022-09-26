const path = require('path')

const express = require('express')
const { engine } = require('express-handlebars')

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express()

// file extension will be the name registered in engine
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main-layout',
}))
app.set('view engine', 'hbs')
app.set('views', 'views')

// body-parser
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminData.routes)
app.use(shopRoutes)

app.use('/', (req, res, next) => {
  res.status(404).render('404', {layout: false, docTitle: 'Page Not Found'})
}) 

app.listen(3000);