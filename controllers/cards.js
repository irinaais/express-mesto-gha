const Card = require ('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.sendCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then(cards => res.status(200).send({ data: cards }))
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка'})
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({ name, link, owner: ownerId })
    .then(card => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка'})
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
        return;
      }
      res.status(200).send({ data: card })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные');
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка'})
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
        return;
      }
      res.status(200).send({ data: card })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные');
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка'})
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
        return;
      }
      res.status(200).send({ data: card })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные');
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка'})
    });
};