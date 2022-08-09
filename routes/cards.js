const router = require('express').Router();
const {
  sendCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');
const { idValidator, createCardValidator } = require('../middlewares/validation');

router.get('/', sendCards);
router.post('/', auth, createCardValidator, createCard);
router.delete('/:cardId', auth, idValidator, deleteCard);
router.put('/:cardId/likes', auth, idValidator, likeCard);
router.delete('/:cardId/likes', auth, idValidator, dislikeCard);

module.exports = router;
