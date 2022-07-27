const router = require('express').Router();
const { sendCards, createCard } = require('../controllers/cards');

router.get('/', sendCards);
router.post('/', createCard);

module.exports = router;