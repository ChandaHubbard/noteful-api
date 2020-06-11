const NotesService = {
    getAllNotes(knex) {
        return knex
        .select('*')
        .from('noteful_notes')
    },
    insertNote(knex, newNote) {
        return knex
        .insert(newNote)
        .into('noteful_notes')
        .returning('*')
        .then(rows => {
            return rows[0]
        })
    },
    getbyId(knex, id) {
        return knex
        .from('noteful_notes')
        .select('*')
        .where('id', id)
        .first()
    },
    deleteNote(knex, notes_id) {
        return knex('noteful_notes')
        .where({ notes_id })
        .delete()
    },
    updateNote(knex, notes_id, newNoteFields) {
        return knex('noteful_notes')
        .where({ notes_id })
        .update(newNoteFields)
    },
}

module.exports = NotesService;