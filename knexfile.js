module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgres://postgres:285882@localhost:5432/desafio-eqi',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'pg',
    debug: true,
    // connection: process.env.DATABASE_URL,
    connection: {
        database: process.env.DATABASE_CONECTION_NAME,
        port: process.env.DATABASE_CONECTION_PORT,
        user: process.env.DATABASE_CONECTION_USER,
        password: process.env.DATABASE_CONECTION_PASSWORD,
        host: process.env.DATABASE_CONECTION_HOST,
        ssl: true
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
