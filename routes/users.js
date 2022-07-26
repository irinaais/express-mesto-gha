const router = require('express').Router();
// const { users } = require ('../usersDB');
const User = require ('../models/user');

router.get('/users', (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка'}));
})

router.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка'}));
})

router.post('/users', (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user}))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка'}));
})

module.exports = router;

// router.get('/users', (req, res) => {
//   res.send(users);
// });

// router.get('/users/:userId', (req, res) => {
//   if (!users[req.params.id]) {
//     res.send('Такого пользователя не существует');
//     return;
//   }
//   const { name, age } = users[req.params.id];
//   res.send(`Пользователь ${name}, ${age} лет`);
// });

// const doesUserExist = (req, res, next) => {
//   if (!users[req.params.id]) {
//     res.send('Такого пользователя не существует');
//     return;
//   }
//   next();
// }
//
// const sendUser = (req, res) => {
//   const { name, age } = users[req.params.id];
//   res.send(`Пользователь ${name}, ${age} лет`);
// }
//
// router.get('/users/:id', doesUserExist);
// router.get('/users/:id', sendUser);