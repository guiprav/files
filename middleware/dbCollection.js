let express = require('express');

let db = require('../db');

module.exports = (name, opt = {}) => {
  let app = express();

  let col = db[name];
  let idField = opt.idField || '_id';
  let mid = opt.middlewares || {};

  if (mid.post || mid.beforePost || mid.afterPost) {
    let before = mid.beforePost || [];
    let after = mid.afterPost || [];

    app.post(`/${name}`,
      ...before, async (req, res, next) => {
        try {
          res.data = await col.insert(req.body);
          next();
        }
        catch(err) {
          console.error(err);
          res.sendStatus(500);
        }
      }, ...after
    );
  }

  if (mid.get || mid.beforeGet || mid.afterGet) {
    let before = mid.beforeGet || [];
    let after = mid.afterGet || [];

    app.get(`/${name}`,
      ...before, async (req, res, next) => {
        try {
          res.data = await col.find(req.query);
          next();
        }
        catch(err) {
          console.error(err);
          res.sendStatus(500);
        }
      }, ...after
    );
  }

  if (mid.getId || mid.beforeGetId || mid.afterGetId) {
    let before = mid.beforeGetId || [];
    let after = mid.afterGetId || [];

    app.get(`/${name}/:id`,
      ...before, async (req, res, next) => {
        try {
          res.data = await col.findOne({
            [idField]: req.params.id,
          });

          next();
        }
        catch(err) {
          console.error(err);
          res.sendStatus(500);
        }
      }, ...after
    );
  }

  if (mid.patch || mid.beforePatch || mid.afterPatch) {
    let before = mid.beforePatch || [];
    let after = mid.afterPatch || [];

    app.patch(`/${name}`,
      ...before, async (req, res, next) => {
        try {
          let [num, docs] = await col.update(
            req.query, req.body, {
              multi: true,
              returnUpdatedDocs: true,
            }
          );

          res.data = docs;
          next();
        }
        catch(err) {
          console.error(err);
          res.sendStatus(500);
        }
      }, ...after
    );
  }

  if (mid.patchId || mid.beforePatchId || mid.afterPatchId) {
    let before = mid.beforePatchId || [];
    let after = mid.afterPatchId || [];

    app.patch(`/${name}/:id`,
      ...before, async (req, res, next) => {
        try {
          let [num, doc] = await col.update({
            [idField]: req.params.id,
          }, req.body, {
            returnUpdatedDocs: true,
          });

          res.data = doc;
          next();
        }
        catch(err) {
          console.error(err);
          res.sendStatus(500);
        }
      }, ...after
    );
  }

  if (mid.put || mid.beforePut || mid.afterPut) {
    let before = mid.beforePut || [];
    let after = mid.afterPut || [];

    app.put(`/${name}/:id`,
      ...before, async (req, res, next) => {
        try {
          let [num, doc] = await col.update({
            [idField]: req.params.id,
          }, req.body);

          res.data = doc;
          next();
        }
        catch(err) {
          console.error(err);
          res.sendStatus(500);
        }
      }, ...after
    );
  }

  if (mid.delete || mid.beforeDelete || mid.afterDelete) {
    let before = mid.beforeDelete || [];
    let after = mid.afterDelete || [];

    app.delete(`/${name}`,
      ...before, async (req, res, next) => {
        try {
          let num = await col.remove(req.query, {
            multi: true,
          });

          res.data = { num };
          next();
        }
        catch(err) {
          console.error(err);
          res.sendStatus(500);
        }
      }, ...after
    );
  }

  if (mid.deleteId || mid.beforeDeleteId || mid.afterDeleteId) {
    let before = mid.beforeDeleteId || [];
    let after = mid.afterDeleteId || [];

    app.delete(`/${name}/:id`,
      ...before, async (req, res, next) => {
        try {
          let num = await col.remove({
            [idField]: req.params.id,
          });

          res.data = { num };
          next();
        }
        catch(err) {
          console.error(err);
          res.sendStatus(500);
        }
      }, ...after
    );
  }

  return app;
};
