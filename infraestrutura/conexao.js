const mysql = require('mysql')
const dotenv = require('dotenv/config')

const conexao = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'agenda-petshop'
})

module.exports = conexao