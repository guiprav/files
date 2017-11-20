let express = require('express');

let comparePassword = require('../../password/compare');
let jwt = require('../../jwt');
let { accounts } = require('../../db');

let app = module.exports = express();

app.post('/auth', async (req, res) => {
  try {
    let account = await accounts.findOne({
      name: req.body.account,
    });

    if (!account) {
      return res.sendStatus(401);
    }

    let validPassword = await comparePassword(
      req.body.password, account.password
    );

    if (!validPassword) {
      return res.sendStatus(401);
    }

    let token = await jwt.sign({
      id: account._id,
    });

    res.send({ token });
  }
  catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
