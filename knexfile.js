const path = require("path");

// configs
module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      username: 'postgres',
      password: "prodpw"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
  },

  useNullAsDefault: true
};