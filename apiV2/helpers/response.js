class Responses {
  static successHandler(statusCode, message, token, res) {
    const newMsg = message.split('/');
    res.status(statusCode).send({
      status: statusCode,
      message: `${newMsg[2]} successful`,
      data: { token },
    });
  }

  static successAdsHandler(statusCode, message, data, res) {
    res.status(statusCode).send({
      status: statusCode,
      message: `${message} successful`,
      data,
    });
  }

  static errorHandler(statusCode, message, res) {
    res.status(statusCode).send({
      status: statusCode,
      error: message,
    });
  }

  static HandleValidators(statusCode, data, res) {
    if (!data) res.status(statusCode).send({ status: statusCode, error: 'isAgent should be a boolean' });
    const resFomart = data.details[0].message.replace('"', '').split('"');
    const gotElem = resFomart[0];
    res.status(statusCode).send({
      status: statusCode,
      error: `${gotElem} field  is invalid `,
    });
  }

  static HandleAdsValidators(statusCode, data, res) {
    if (!data) res.status(statusCode).send({ status: statusCode, error: 'price should be a number not less than 1' });
    const resFomart = data.details[0].message.replace('"', '').split('"');
    const gotElem = resFomart[0];
    res.status(statusCode).send({
      status: statusCode,
      error: `${gotElem} field  is invalid `,
    });
  }
}
export default Responses;
