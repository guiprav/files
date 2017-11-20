let srs = require('secure-random-string');
let { promisify } = require('util');

srs = promisify(srs);

module.exports = async (req, res, next) => {
  try {
    req.body = {
      ...req.body, uploadKeys: {
        main: await srs(),
      },
    };

    next();
  }
  catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
};
