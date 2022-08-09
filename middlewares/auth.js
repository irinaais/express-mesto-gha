const jwt = require('jsonwebtoken');
const { AUTH_ERROR_CODE } = require('../utils/constants');

const { JWT_SECRET } = process.env;

const handleAuthError = (res) => {
  res.status(AUTH_ERROR_CODE).send({ message: 'Необходима авторизация' });
};

// remove first 7 symbols, equivalent of 'bearer '
const extractBearerToken = (header) => header.substring(7);

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  let token;
  // if (req.cookies.jwt != null) {
  //   token = req.cookies.jwt;
  // } else
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = extractBearerToken(authorization);
  } else {
    handleAuthError(res);
    return;
  }

  console.log(`JWT_SECRET=${JWT_SECRET}`);
  console.log(`token=${token}`);
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.log(err);
    handleAuthError(res);
    return;
  }
  req.user = payload;
  next();
};
