function responseHandler(statusCode, message, data, res) {
  return res.status(statusCode).send({
    status: statusCode,
    message,
    data,
  });
}

export default responseHandler;
