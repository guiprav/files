let bc = require('bcryptjs');
let { promisify } = require('util');

module.exports = promisify(bc.compare.bind(bc));
