require('dotenv').config()
const knex = require('knex')



// const q1 = knexInstance('noteful_notes').select('*').toQuery()
// const q2 = knexInstance.from('noteful_folders').select('*').toQuery()

console.log('knex and driver installed correctly');
// console.log('q1', q1)
// console.log('q2', q2)
const qry = knexInstance
.select('note_label', 'content', 'folder_id')
.from('noteful_notes')
.first()
.toQuery()
// .then(result => {
//     console.log(result)
// })

console.log(qry)

// console.log(NotefulService.getAllNotes())

//logic

// db.get('/notes', (req, res) => {
//     res.send('We have notes!');
// })

module.exports = knexInstance