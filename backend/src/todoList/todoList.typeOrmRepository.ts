import { DataSource } from "typeorm/data-source/DataSource"

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "'./database.db'"
})

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
  .then(() => {
      // here you can start to work with your database
  })
  .catch((error) => console.log(error))

class TypeOrmRepository implements ITodoRepository {

}