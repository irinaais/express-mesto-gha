const User = require ('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.sendUsers = (req, res) => {
  User.find({})
    .then(users => res.status(200).send({ data: users }))
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка'})
    });
};

module.exports.sendUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user._id) {
        throw new NotFoundError('Пользователь не найден');
        return;
      }
      res.status(200).send({ data: user })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные');
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка'})
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.status(200).send({ data: user}))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
        res.status(400).send({ message: 'Переданы некорректные данные'})
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка'})
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => {
      if (!user._id) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
        return;
      }
      res.status(200).send({ data: user})
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка'})
    });
} ;

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => {
      if (!user._id) {
        throw new NotFoundError('Пользователь не найден');
        return;
      }
      res.status(200).send({ data: user})
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка'})
    });
} ;