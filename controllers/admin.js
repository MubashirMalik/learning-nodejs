const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    docTitle: 'Add Product', 
    path: '/admin/add-product', 
    editMode: false
  })
}

exports.postAddProduct = (req, res, next) => {
  const {title, imageUrl, description, price} = req.body
  req.user.createProduct({title, imageUrl, description, price})
    .then(result =>  {
      console.log("Created Product")
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const {productId} = req.params
  req.user.getProducts({where: {id: productId}})
    .then(products => {
      const product = products[0]
      if (!product) {
        return res.redirect('/')
      }

      res.render('admin/edit-product', {
        docTitle: 'Edit Product', 
        path: '/admin/edit-product', 
        editMode,
        product
      })
    })
    .catch(err => console.log(err))
}

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, price, description} = req.body
  Product.findByPk(productId)
    .then(product => {
      product.title = title
      product.imageUrl = imageUrl
      product.price = price
      product.description = description
      return product.save()
    })
    .then(result =>  {
      console.log("Updated Product")
      res.redirect('/admin/products') 
    })
    .catch(err => console.log(err))
}

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
    .then((products) => {
      res.render('admin/products', {
        products, 
        docTitle: 'Admin Products', 
        path: 'admin/products', 
      })
    })
    .catch(err => console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body
  Product.findByPk(productId)
    .then(product => product.destroy())
    .then(result => {
      console.log("Deleted Product")
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
}