const db = require('./noteful')

const NotefulService = {
    getAllNotes() {
        return 'all the notes!!'
    }
}

//handle logic

db.getAllNotes('/notes', (req, res) => {
    res.send('We have notes!');
})

// GET /notes
// POST /notes
// GET /notes/:notes_id
// DELETE /notes/:notes_id
// PATCH /notes/:notes_id


module.exports = NotefulService
