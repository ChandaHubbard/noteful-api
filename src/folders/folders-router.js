// const path = require('require')
const express = require('express');
const xss = require('xss')
const FoldersService = require('./folders-service')

const foldersRouter = express.Router();
const jsonParser = express.json;

const serializeFolder = (folder) => ({
    id: folder.id,
    folder: xss(folder.folder),
});

foldersRouter
.route('/folders')
.get((req, res, next) => {
    const knexInstance = req.app.get('db');
    FoldersService.getAllFolders(knexInstance)
    .then((folders) => {
        res.json(folders.map(serializeFolder));
    })
    .catch(next);
})
.post((req, res, next) => {
    const newFolder = req.body;
console.log(newFolder, "new folder")
    if (!newFolder.folder) {
    return res.status(400).json({
        error: { message: `Missing folder in request body`},    
    });
  }
    FoldersService.insertFolder(req.app.get("db"), newFolder)
      .then((folder) => {
        res
          .status(201)
          .location(`folders/${folder.id}`)
          .json(serializeFolder(folder));
      })
      .catch(next);
  });

foldersRouter
  .route('/folders/:folder_id')
  .all((req, res, next) => {
    FoldersService.getbyId(
      req.app.get("db"), 
      req.params.folder_id)
      .then((folders) => {
        if (!folders) {
          return res.status(404).json({
            error: { message: `Folder doesn't exist` },
          });
        }
        res.folders = folders;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeFolder(res.folders));
  })
  .delete((req, res, next) => {
    FoldersService.deleteFolder(
      req.app.get("db"), 
      req.params.folder_id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch((req, res, next) => {
    const folderToUpdate = req.body;

    const numberOfValues = Object.values(folderToUpdate).filter(Boolean)
      .length;
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain 'folder' name`,
        },
      });

      FoldersService.updateFolder(
      req.app.get("db"),
      req.params.folder_id,
      folderToUpdate
    )
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = foldersRouter;
