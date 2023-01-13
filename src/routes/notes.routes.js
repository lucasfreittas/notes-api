const {Router} = require('express');
const notesRouter = Router();

const NotesController = require('../controllers/NotesController');
const notesController = new NotesController();

notesRouter.post('/:user_id', notesController.create);
notesRouter.get('/:id', notesController.show);
notesRouter.delete('/:id', notesController.delete);
notesRouter.get('/', notesController.search);

module.exports = notesRouter;