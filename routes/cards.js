const router = require('express').Router();
const {
  sendCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { idValidator, createCardValidator } = require('../middlewares/validation');

router.get('/', sendCards);
router.post('/', createCardValidator, createCard);
router.delete('/:cardId', idValidator, deleteCard);
router.put('/:cardId/likes', idValidator, likeCard);
router.delete('/:cardId/likes', idValidator, dislikeCard);

module.exports = router;
