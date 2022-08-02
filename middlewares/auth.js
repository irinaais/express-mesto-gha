const jwt = require('jsonwebtoken');
const { AUTH_ERROR_CODE } = require('../utils/constants');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.status(AUTH_ERROR_CODE).send({ message: 'Необходима авторизация' });
  }
  const token = authorization.replace('Bearer', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(AUTH_ERROR_CODE).send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  next();
};
