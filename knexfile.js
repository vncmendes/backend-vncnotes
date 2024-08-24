const path = require("path");

//configs
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      postgres_URL: 'postgres://default:KfX0md1yEvWa@ep-autumn-fire-a4xbe7yb-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
      postgres_HOST: 'ep-autumn-fire-a4xbe7yb-pooler.us-east-1.aws.neon.tech',
      postgres_DATABASE: 'postgres',
      postgres_USER: 'default',
      postgres_PASSWORD: 'KfX0md1yEvWa'
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
      postgres_URL: 'postgres://default:KfX0md1yEvWa@ep-autumn-fire-a4xbe7yb-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
      postgres_HOST: 'ep-autumn-fire-a4xbe7yb-pooler.us-east-1.aws.neon.tech',
      postgres_DATABASE: 'postgres',
      postgres_USER: 'default',
      postgres_PASSWORD: 'KfX0md1yEvWa'
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