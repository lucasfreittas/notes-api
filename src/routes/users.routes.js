const {Router} = require('express');
const multer = require('multer');
const uploadConfig = require('../configs/uploads');

const usersRouter = Router();
const upload = multer(uploadConfig.MULTER);

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const UsersController = require('../controllers/UsersController');
const usersController = new UsersController();
const UserAvatarController = require('../controllers/UserAvatarController');
const userAvatarController = new UserAvatarController();



usersRouter.post('/', usersController.create);
usersRouter.put('/', ensureAuthenticated, usersController.update);
usersRouter.patch('/avatar', ensureAuthenticated, upload.single("avatar"), userAvatarController.update);
usersRouter.patch('/avatar', ensureAuthenticated, upload.single("avatar"), userAvatarController.update);


module.exports = usersRouter;