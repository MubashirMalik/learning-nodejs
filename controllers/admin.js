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
  const product = new Product(null, title, imageUrl, description, price)
  product.save()
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const {productId} = req.params
  Product.findById(productId, product => {
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
}

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, price, description} = req.body
  const updatedProduct = new Product(productId, title, imageUrl, description, price)
  updatedProduct.save()
  res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      products, 
      docTitle: 'Admin Products', 
      path: 'admin/products', 
    })
  })
}

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body
  Product.deleteById(productId)
  res.redirect('/admin/products')
}