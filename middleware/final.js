module.exports = (req, res, next) => {
  if (!res.data) {
    return next();
  }

  res.send(res.data);
};
