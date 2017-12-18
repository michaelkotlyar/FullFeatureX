const initOptions = {
  // error(err, e) {
  //   console.log(e + '\n' + err);
  // }
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

const getUser = (username) => db.one('SELECT * FROM users WHERE user_name = $1', [username]);

const getUserById = (id) => db.one('SELECT * FROM users WHERE user_id = $1', [id]);

const getUserByEmail = (email) => db.one('SELECT * FROM users WHERE user_email = $1', [email]);

const uniqueUserUsername = (username) => db.query('SELECT EXISTS (SELECT * FROM users WHERE user_name = $1)', [username]);

const uniqueUserEmail = (email) => db.query('SELECT EXISTS (SELECT * FROM users WHERE user_email = $1)', [email]);

const registerUser = (username, email, password) => db.none('INSERT INTO users(user_name, user_password, user_email, user_type) values($1, $2, $3, 0)', [username, email, password]);

module.exports = {
  getAllUsers,
  getUser,
  getUserById,
  getUserByEmail,
  uniqueUserUsername,
  uniqueUserEmail,
  registerUser
};
