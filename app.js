// const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
// const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  console.log('Connected to mestodb');

  await app.listen(PORT);
  console.log(`Server listen on ${PORT}`);
  // console.log(BASE_PATH);
}

app.use('/users', require('./routes/users'));
app.use('/users/:userId', require('./routes/users'));

main();

