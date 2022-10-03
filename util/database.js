const Sequelize = require('sequelize')

const sequelize = new Sequelize('nodejs-course', 'root', '12345678', {
    dialect: 'mysql',
    host: 'localhost' // by default
})

module.exports = sequelize