const router = require('express').Router();
const {
  sendUsers, sendUserById, updateUser, updateAvatar, getMe,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const { updateProfileValidator, updateAvatarValidator, idValidator } = require('../middlewares/validation');

router.get('/', auth, sendUsers);
router.get('/:userId', auth, idValidator, sendUserById);
router.patch('/me', auth, updateProfileValidator, updateUser);
router.patch('/me/avatar', updateAvatarValidator, updateAvatar);
router.get('/me', auth, getMe);

module.exports = router;
