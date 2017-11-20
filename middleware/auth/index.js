let express = require('express');

let app = module.exports = express();

app.use(require('./authentication'));
app.use(require('./authorization'));
