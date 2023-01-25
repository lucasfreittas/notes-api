const {Router} = require('express');
const notesRouter = Router();

const NotesController = require('../controllers/NotesController');
const notesController = new NotesController();
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

notesRouter.use(ensureAuthenticated);

notesRouter.post('/', notesController.create);
notesRouter.get('/:id', notesController.show);
notesRouter.delete('/:id', notesController.delete);
notesRouter.get('/', notesController.search);

module.exports = notesRouter;