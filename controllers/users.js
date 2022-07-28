const User = require('../models/user');
const {
  CORRECT_CODE, NOT_FOUND_CODE, BAD_REQUEST_CODE, DEFAULT_ERROR_CODE,
} = require('../utils/constants');

module.exports.sendUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(CORRECT_CODE).send({ data: users }))
    .catch(() => {
      res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

module.exports.sendUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_CODE).send({ message: 'Указанный пользователь не найден' });
        return;
      }
      res.status(CORRECT_CODE).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_CODE).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(CORRECT_CODE).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_CODE).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_CODE).send({ message: 'Указанный пользователь не найден' });
        return;
      }
      res.status(CORRECT_CODE).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_CODE).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_CODE).send({ message: 'Указанный пользователь не найден' });
        return;
      }
      res.status(CORRECT_CODE).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_CODE).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};
