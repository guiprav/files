let Datastore = require('nedb');
let { promisify } = require('util');

module.exports = name => {
  let ds = new Datastore({
    filename: `${__dirname}/data/${name}.ndjson`,
    autoload: true,
  });

  [
    'ensureIndex',
    'find',
    'findOne',
    'insert',
    'remove',
  ]
  .forEach(k => {
    ds[k] = promisify(ds[k].bind(ds));
  });

  let originalUpdate = ds.update.bind(ds);

  ds.update = (query, update, opts) => new Promise(
    (resolve, reject) => {
      originalUpdate(query, update, opts, (err, ...rest) => {
        if (err) {
          return reject(err);
        }

        resolve(rest);
      });
    }
  );

  return ds;
};
