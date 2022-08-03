const router = require('express').Router();
const {
  sendUsers, sendUserById, updateUser, updateAvatar, getMe,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/', auth, sendUsers);
router.get('/:userId', auth, sendUserById);
router.patch('/me', auth, updateUser);
router.patch('/me/avatar', updateAvatar);
router.get('/me', auth, getMe);

module.exports = router;
