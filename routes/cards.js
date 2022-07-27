const router = require('express').Router();
const { sendCards } = require('../controllers/cards');

router.get('/', sendCards);

module.exports = router;