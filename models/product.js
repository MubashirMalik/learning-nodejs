const fs = require('fs')
const path = require('path')

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
  constructor(title) {
    this.title = title
  }

  save() {
    getProductsFromFile(products => {
      products.push(this)
      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        if (err) {
          console.log(err)
        }
      })
    })
  }

  static fetchAll(callback) {
    getProductsFromFile(callback)
  }
}