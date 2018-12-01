import Knex from 'knex'

const database = Knex({
  client: 'sqlite3',
  debug: true,
  asyncStackTraces: true,
  useNullAsDefault: true,
  connection: {
    filename: "./organizer-database.sqlite"
  }
})

export default database
