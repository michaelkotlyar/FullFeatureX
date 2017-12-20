var initOptions = {
  // error(err, e) {
  //   console.log(e + '\n' + err);
  // }
};

var pgp = require('pg-promise')(initOptions);

var cn = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};

var db = pgp(cn);


var path = require('path');

function sql(file) {
  return new pgp.QueryFile(path.join(__dirname, 'sql', file + '.sql'), { minify: true });
}

module.exports = {

  getAllUsers: () => db.any(sql('getAllUsers')),
  getUser: (username) => db.one(sql('getUserByUsername'), [username]),
  getUserById: (id) => db.one(sql('getUserById'), [id]),
  getUserByEmail: (email) => db.one(sql('getUserByEmail'), [email]),
  uniqueUserUsername: (username) => db.query(sql('uniqueUsername'), [username]),
  uniqueUserEmail: (email) => db.query(sql('uniqueEmail'), [email]),
  registerUser: (username, email, password) => db.none('INSERT INTO users(user_name, user_password, user_email, user_type) values($1, $2, $3, 0)', [username, email, password])
};
