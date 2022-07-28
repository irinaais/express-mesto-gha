class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.errorMesage = message;
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;