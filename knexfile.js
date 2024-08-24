const path = require("path");

//configs
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'verceldb',
      user:     'default',
      password: 'KfX0md1yEvWa'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },

    useNullAsDefault: true
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'verceldb',
      user:     'default',
      password: 'KfX0md1yEvWa'
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

//configs
// module.exports = {
//   development: {
//     client: 'sqlite3',
//     connection: {
//       filename: path.resolve(__dirname, "src", "database", "database.db")
//     },

//     pool: {
//       afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = 1", cb)
//     },

//     migrations: {
//       directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
//     },
    
//     useNullAsDefault: true
//   }
// };
