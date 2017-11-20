module.exports = (req, res, next) => {
  if (req.userAccount.type === 'admin') {
    return next();
  }

  res.sendStatus(403);
};
