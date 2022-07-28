const router = require('express').Router();
const {
  sendUsers, sendUserById, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', sendUsers);
router.get('/:userId', sendUserById);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
