const FoldersService = {
    getAllFolders(knex) {
        return knex.select('*').from('noteful_folders')
    },
    insertNote(knex, newFolder) {
        return knex
        .insert(newFolder)
        .into('noteful_folders')
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
    deleteFolder(knex, id) {
        return knex('noteful_folders')
        .where('folder_id', id)
        .delete()
    },
    updateFolder(knex, id, newFolderFields) {
        return knex('noteful_folders')
        .where('folder_id', id)
        .update(newFolderFields)
    },
}

module.exports = FoldersService;