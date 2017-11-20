let express = require('express');

let jwt = require('../../jwt');
let { accounts } = require('../../db');

let app = module.exports = express();

app.use(async (req, res, next) => {
  try {
    let authHdr = req.headers.authorization;

    if (!authHdr) {
      return next();
    }

    let prefix = 'Bearer ';

    if (!authHdr.startsWith(prefix)) {
      return next();
    }

    authHdr = authHdr.slice(prefix.length);

    let token = await jwt.verify(authHdr);

    req.userAccount = await accounts.findOne({
      _id: token.id,
    });

    next();
  }
  catch(err) {
    if (err.name === 'JsonWebTokenError') {
      res.status(401);
      res.send({ err: 'Bad authorization token' });

      return;
    }

    console.error(err);
    res.sendStatus(500);
  }
});
