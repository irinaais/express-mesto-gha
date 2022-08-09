const router = require('express').Router();
const {
  sendUsers, sendUserById, updateUser, updateAvatar, getMe,
} = require('../controllers/users');
const { updateProfileValidator, updateAvatarValidator, idValidator } = require('../middlewares/validation');

router.get('/', sendUsers);
router.get('/:userId', idValidator, sendUserById);
router.patch('/me', updateProfileValidator, updateUser);
router.patch('/me/avatar', updateAvatarValidator, updateAvatar);
router.get('/me', getMe);

module.exports = router;
