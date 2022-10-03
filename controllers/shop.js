const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('shop/product-list', {
      products, 
      docTitle: 'All Products', 
      path: '/products', 
    })
  })
  .catch(err => console.log(err))
}

exports.getProduct = (req, res, next) => {
  const { productId } = req.params
  Product.findByPk(productId)
  .then((product) => {
    res.render('shop/product-detail', {
      product,
      docTitle: product.title,
      path: '/products'
    })
  })
  .catch(err => console.log(err))
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        products, 
        docTitle: 'Shop', 
        path: '/',
      })
    })
    .catch(err => console.log(err))
}

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            docTitle: 'Your Cart',
            products
          })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

exports.postCart = (req, res, next) => {
  const { productId } = req.body
  let fetchedCart;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart
      return cart
        .getProducts({where: {id: productId}})
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0]
      }
      let newQuantity = 1
      if (product) {
        newQuantity = product.cartItem.quantity + 1
        return fetchedCart.addProduct(product, {through: {quantity: newQuantity}})
      }
      return Product
        .findByPk(productId)
        .then(product => {
          return fetchedCart.addProduct(product, {through: {quantity: newQuantity}})
        })
        .catch(err => console.log(err)) 
    })
    .then(() => {
      res.redirect('/cart')
    })
    .catch(err => console.log(err))
}

exports.postCartDeleteProduct = (req, res, next) => {
  const { productId } = req.body
  Product.findById(productId, product => {
    Cart.deleteProduct(productId, product.price)
    res.redirect('/cart')
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    docTitle: 'Your Orders'
  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    docTitle: 'Checkout'
  })
}