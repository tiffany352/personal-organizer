import Knex from 'knex'

const database = Knex({
  client: 'sqlite3',
  debug: true,
  asyncStackTraces: true,
  connection: {
    filename: "./organizer-database.sqlite"
  }
})

export default database
