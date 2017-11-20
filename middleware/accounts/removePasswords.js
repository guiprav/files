module.exports = (req, res, next) => {
  if (!res.data) {
    return next();
  }

  let { data } = res;

  if (!Array.isArray(data)) {
    data = [data];
  }

  data.forEach(x => {
    delete x.password;
  });

  next();
};
