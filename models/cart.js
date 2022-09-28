const fs = require('fs')
const path = require('path')

const filePath = path.join(
  path.dirname(process.mainModule.filename), 
  'data',
  'cart.json'
)

module.exports = class Cart {
  static addProduct(id, price) {
    fs.readFile(filePath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 }
      if (!err) {
        cart = JSON.parse(fileContent)
      }

      const existingProductIndex = cart.products.findIndex(p => p.id === id)
      const existingProduct = cart.products[existingProductIndex]
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = {...existingProduct, qty: existingProduct.qty+1}
        cart.products = [...cart.products]
        cart.products[existingProductIndex] = updatedProduct
      } else {
        updatedProduct = {id, qty: 1}
        cart.products = [...cart.products, updatedProduct]
      }
      cart.totalPrice += parseFloat(price)
      fs.writeFile(filePath, JSON.stringify(cart), (err) => {
        if (err) {
          console.log(err)
        }
      })
    })
  }

  static deleteProduct(id, price) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        return
      }
      const updatedCart = {...JSON.parse(fileContent)}
      const product = updatedCart.products.find(p => p.id === id)
      if (!product) {
        return
      }
      updatedCart.products = updatedCart.products.filter(p => p.id !== id)
      updatedCart.totalPrice -= price * product.qty

      fs.writeFile(filePath, JSON.stringify(updatedCart), (err) => {
        if (err) {
          console.log(err)
        }
      })
    })
  }

  static getCart(callback) {
    fs.readFile(filePath, (err, fileContent) => {
      const cart = JSON.parse(fileContent)
      if (err) {
        callback(null)
      } else {
        callback(cart)
      }
    })
  }
}