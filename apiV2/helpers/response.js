function responseHandler(statusCode, message, token, res) {
  return res.status(statusCode).send({
    status: statusCode,
    message,
    data: { token },
  });
}

export default responseHandler;
