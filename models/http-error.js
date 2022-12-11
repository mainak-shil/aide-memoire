class HttpError extends Error {
  constructor(message, errorCode) {
    super(message, errorCode);
    this.errorCode = errorCode;
  }
}
module.exports = HttpError;
