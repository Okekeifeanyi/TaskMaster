require('dotenv').config(); // Ensure environment variables are loaded

module.exports = {

  development: {
    client: 'pg', // Use PostgreSQL for development
    connection: {
      user: process.env.DB_USER,     // Environment variable for user
      host: process.env.DB_HOST,     // Environment variable for host
      database: process.env.DB_NAME, // Environment variable for database name
      password: process.env.DB_PASSWORD, // Environment variable for password
      port: process.env.DB_PORT,     // Environment variable for port
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'   // Name of the migrations table
    }
  },

  staging: {
    client: 'pg', // Use PostgreSQL for staging
    connection: {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg', // Use PostgreSQL for production
    connection: {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
