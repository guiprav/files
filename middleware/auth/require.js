module.exports = (req, res, next) => {
  if (req.userAccount) {
    return next();
  }

  res.sendStatus(403);
};
