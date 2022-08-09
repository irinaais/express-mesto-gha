require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { NOT_FOUND_CODE } = require('./utils/constants');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { registerValidator, authValidator } = require('./middlewares/validation');
const handleError = require('./middlewares/handleError');

const { PORT = 3000 } = process.env;
const app = express();

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  console.log('Connected to mestodb');

  await app.listen(PORT);
  console.log(`Server listen on ${PORT}`);
}

main();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/signup', registerValidator, createUser);
app.post('/signin', authValidator, login);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(auth);

app.use((req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: 'Указанная страница не найдена' });
});

app.use(errors());

app.use((err, req, res, next) => {
  console.log('000', err);
  handleError(err, res, next);
});
