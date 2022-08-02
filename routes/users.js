const router = require('express').Router();
const {
  sendUsers, sendUserById, updateUser, updateAvatar, getMe,
} = require('../controllers/users');

router.get('/', sendUsers);
router.get('/:userId', sendUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);
router.get('/me', getMe);

module.exports = router;
