require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { NOT_FOUND_CODE, DEFAULT_ERROR_CODE } = require('./utils/constants');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { registerValidator, authValidator } = require('./middlewares/validation');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.post('/signup', registerValidator, createUser);
app.post('/signin', authValidator, login);

app.use((req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: 'Указанная страница не найдена' });
});
app.use(auth);
app.use((err, req, res) => {
  res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  console.log('Connected to mestodb');

  await app.listen(PORT);
  console.log(`Server listen on ${PORT}`);
}

main();
