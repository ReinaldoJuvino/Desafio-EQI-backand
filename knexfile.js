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
    client: 'postgresql',
    debug: true,
    ssl: true,
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
