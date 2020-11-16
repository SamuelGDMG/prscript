const Sequelize = require("sequelize");

const connection = new Sequelize('projeto','root','123', {
    host:'localhost',
    dialect: 'mysql'
});

module.exports = connection;
