function ResponseError (statusCode, message) {
  throw {
    statusCode,
    message
  }
}

module.exports = {
  ResponseError
}