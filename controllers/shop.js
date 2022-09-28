const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      products, 
      docTitle: 'All Products', 
      path: '/products', 
    })
  })
}

exports.getProduct = (req, res, next) => {
  const { productId } = req.params
  Product.findById(productId, product => {
    res.render('shop/product-detail', {
      product,
      docTitle: product.title,
      path: '/products'
    })
  })
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      products, 
      docTitle: 'Shop', 
      path: '/',
    })
  })
}

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = []
      for (product of products) {
        const cartProductData = cart.products.find(p => p.id === product.id)
        if (cartProductData) {
          cartProducts.push({productData: product, qty: cartProductData.qty})
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        docTitle: 'Your Cart',
        products: cartProducts
      })
    })
  }) 
}

exports.postCart = (req, res, next) => {
  const { productId } = req.body
  Product.findById(productId, product => {
    Cart.addProduct(productId, product.price)
  })
  res.redirect('/cart')
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