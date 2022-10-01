const database = require('../util/database')

const Cart = require('./cart')

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  save() {
    return database.execute('INSERT into products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)', [this.title, this.price, this.imageUrl, this.description])
  }

  static fetchAll() {
    return database.execute('SELECT * FROM products')
  }

  static findById(id) {
    return database.execute('SELECT * FROM products WHERE id = ?', [id])
  }

  static deleteById(id) {
   
  }
}