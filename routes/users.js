const router = require('express').Router();
// const { users } = require ('../usersDB');
const { sendUsers, sendUserById, createUser } = require('../controllers/users');

router.get('/users', sendUsers);
router.get('/users/:userId', sendUserById);
router.post('/users', createUser);

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