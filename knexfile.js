require('dotenv').config({path: './.env'});

module.exports = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    },
    migrations: {
      directory: __dirname + '/src/server/config/database/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/config/database/seeds'
    }
  },

  test: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME + '_test',
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    },
    migrations: {
      directory: __dirname + '/src/server/config/database/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/config/database/seeds'
    }
  }

  // production: {}
};
