const jwt = require('jsonwebtoken');
const { AUTH_ERROR_CODE } = require('../utils/constants');

const { JWT_SECRET } = process.env;

const handleAuthError = (res) => {
  res.status(AUTH_ERROR_CODE).send({ message: 'Необходима авторизация' });
};

// const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  // const { authorization } = req.headers;
  let token;
  if (req.cookies.jwt != null) {
    token = req.cookies.jwt;
  // } else if (authorization && authorization.startsWith('Bearer') && authorization.length > 20) {
  //   token = extractBearerToken(authorization);
  } else {
    handleAuthError(res);
    return;
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    handleAuthError(res);
    return;
  }
  req.user = payload;
  next();
};
