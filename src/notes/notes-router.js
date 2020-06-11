const path = require('path');
const express = require("express");
const xss = require("xss");
const NotesService = require("./notes-service");

const notesRouter = express.Router();
const jsonParser = express.json();

const serializeNotes = (notes) => ({
  id: notes.id,
  note_label: xss(notes.note_label),
  content: xss(notes.content),
  modified: notes.modified,
  folder_id: notes.folder_id,
});

notesRouter
  .route('/notes')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    NotesService.getAllNotes(knexInstance)
      .then((notes) => {
        res.json(notes.map(serializeNotes));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { note_label, content, folder_id } = req.body;
    const newNote = { note_label, content, folder_id };

    for (const [key, value] of Object.entries(newNote)) {
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });
      }

    NotesService.insertNote(
      req.app.get("db"), 
      newNote)
      .then((notes) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${notes.id}`))
          .json(serializeNotes(notes));
      })
      .catch(next);
  });

notesRouter
  .route('/:notes_id')
  .all((req, res, next) => {
    NotesService.getById(
      req.app.get("db"), 
      req.params.notes_id)
      .then(notes => {
        if (!notes) {
          return res
          .status(404)
          .json({
            error: { message: `Note doesn't exist` },
          });
        }
        res.notes = notes;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeNotes(res.notes));
  })
  .delete((req, res, next) => {
    NotesService.deleteNote(
      req.app.get("db"), 
      req.params.notes_id
      )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const { note_label, content, folder_id, modified } = req.body;
    const noteToUpdate = { note_label, content, folder_id, modified };

    const numberOfValues = Object.values(noteToUpdate).filter(Boolean).length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Request body must content either 'label', 'style' or 'content'`,
        },
      });
    }
    NotesService.updateNote(
      req.app.get('db'),
      req.params.notes_id,
      noteToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = notesRouter;
