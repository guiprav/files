let bc = require('bcryptjs');
let { promisify } = require('util');

let bcHash = promisify(bc.hash.bind(bc));

module.exports = pass => bcHash(pass, 10);
