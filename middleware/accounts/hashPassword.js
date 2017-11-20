let hash = require('../../password/hash');

module.exports = async (req, res, next) => {
  try {
    switch (req.method) {
      case 'POST': {
        let { password } = req.body;

        if (!password) {
          return next();
        }

        req.body.password = await hash(password);
        next();

        break;
      }

      case 'PATCH': {
        let { $set } = req.body;

        if (!$set) {
          return next();
        }

        let { password } = $set;

        if (!password) {
          return next();
        }

        $set.password = await hash(password);
        next();

        break;
      }

      default:
        throw new Error(`Bad request type`);
    }
  }
  catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
