const router = require('express').Router();
const { sendUsers, sendUserById, createUser, updateUser } = require('../controllers/users');

router.get('/', sendUsers);
router.get('/:userId', sendUserById);
router.post('/', createUser);
router.patch('/me', updateUser);

module.exports = router;