const initOptions = {
  error(err, e) {
    console.log(e);
    console.log(err);
  }
};

const pgp = require('pg-promise')(initOptions);

const cn = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};

const db = pgp(cn);

const getAllUsers = () => db.any('SELECT * FROM users');

module.exports = {
  getAllUsers
};
