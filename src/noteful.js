require('dotenv').config()
const knex = require('knex')
const NotefulService = require('./noteful-service')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})

console.log(NotefulService.getAllNotes())