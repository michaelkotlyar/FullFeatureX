var initOptions = {
  error(err, e) {
    console.log(e + '\n' + err);
  }
};

var pgp = require('pg-promise')(initOptions);

var test = '';

if (process.env.NODE_ENV === 'test') {
  test = '_test';
}

var cn = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME + test,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};

var db = pgp(cn);

module.exports = db;
