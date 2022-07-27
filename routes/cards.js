const router = require('express').Router();
const { sendCards, createCard, deleteCard } = require('../controllers/cards');

router.get('/', sendCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);

module.exports = router;