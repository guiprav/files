module.exports = (req, res, next) => {
  if (
    req.userAccount.type === 'admin'
    || req.userAccount.name === req.params.id
  ) {
    return next();
  }

  res.sendStatus(403);
};
