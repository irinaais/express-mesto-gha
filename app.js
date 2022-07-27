const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use((req, res, next) => {
  req.user = {
    _id: '62e06557b4f23d0f5b1ec9d2' // захардкодили id создателя для всех карточек
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  console.log('Connected to mestodb');

  await app.listen(PORT);
  console.log(`Server listen on ${PORT}`);
}

main();

