let bodyParser = require('body-parser');
let express = require('express');

let accounts = require('./middleware/accounts');
let auth = require('./middleware/auth');
let final = require('./middleware/final');

let app = module.exports = express();
let port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(auth);

app.use(accounts);
app.use(final);

app.listen(port);
console.log(`Listening on port ${port}.`);
