require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
    // 'postgresql://notes_master@localhost/noteful-api'
})

console.log('knex and driver installed correctly');

// console.log(NotefulService.getAllNotes())

//logic

// db.get('/notes', (req, res) => {
//     res.send('We have notes!');
// })

module.exports = knexInstance