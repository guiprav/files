let collection = require('./collection');

module.exports = collection('accounts');

module.exports.ensureIndex({
  fieldName: 'name',
  unique: true,
})
.catch(console.error);
