CREATE TABLE noteful_notes (
    id serial PRIMARY KEY,
    note_label TEXT NOT NULL,
    content TEXT,
    folder_id INTEGER REFERENCES noteful_folders(id)
    ON DELETE CASCADE
);