const jwt = require('jsonwebtoken');
const { AUTH_ERROR_CODE } = require('../utils/constants');

const handleAuthError = (res) => {
  res.status(AUTH_ERROR_CODE).send({ message: 'Необходима авторизация' });
};

const extractBearerToken = (header) => header.substring(7);

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  let token;

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = extractBearerToken(authorization);
  } else if (req.cookies.jwt != null) {
    token = req.cookies.jwt;
  } else {
    handleAuthError(res);
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, 'dev-secret');
  } catch (err) {
    console.error(err);
    handleAuthError(res);
    return;
  }
  req.user = payload;
  next();
};
