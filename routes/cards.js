const router = require('express').Router();
const { sendCards, createCard, deleteCard, likeCard } = require('../controllers/cards');

router.get('/', sendCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);

module.exports = router;