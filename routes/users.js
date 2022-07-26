const router = require('express').Router();
const { sendUsers, sendUserById, createUser } = require('../controllers/users');

router.get('/', sendUsers);
router.get('/:userId', sendUserById);
router.post('/', createUser);

module.exports = router;