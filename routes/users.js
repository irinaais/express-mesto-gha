const router = require('express').Router();
const {
  sendUsers, sendUserById, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', sendUsers);
router.get('/:userId', sendUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
