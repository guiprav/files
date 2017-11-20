let jwt = require('jsonwebtoken');
let { promisify } = require('util');

let secret = process.env.JWT_SECRET || 'development';

if (
  process.env.NODE_ENV === 'production'
  && secret === 'development'
) {
  console.error(`Missing JWT_SECRET.`);
  process.exit(1);
}

let jwtSign = promisify(jwt.sign.bind(jwt));
let jwtVerify = promisify(jwt.verify.bind(jwt));

module.exports = {
  sign: (payload, ...rest) => {
    return jwtSign(payload, secret, ...rest);
  },

  verify: (payload, ...rest) => {
    return jwtVerify(payload, secret, ...rest);
  },
};
