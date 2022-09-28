const fs = require('fs')
const path = require('path')

const Cart = require('./cart')

const filePath = path.join(
  path.dirname(process.mainModule.filename), 
  'data',
  'products.json'
)

const getProductsFromFile = (callback) => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      return callback([])
    }
    return callback(JSON.parse(fileContent))
  })
}

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(p => p.id === this.id)
        const updatedProducts = [...products]
        updatedProducts[existingProductIndex] = this
        fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
          if (err) {
            console.log(err)
          }
        })
      } else {
        this.id = Math.random().toString()

        products.push(this)
        fs.writeFile(filePath, JSON.stringify(products), (err) => {
          if (err) {
            console.log(err)
          }
        })
      }
    })
  }

  static fetchAll(callback) {
    getProductsFromFile(callback)
  }

  static findById(id, callback) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id)
      callback(product)
    })
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id)
      const updatedProducts = products.filter(p => p.id !== id)
      fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price)
        }
      })
    })
  }
}