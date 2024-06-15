import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import { Token } from '../entity/Token';

/**
 * Data source configuration for the application.
 * Uses PostgreSQL as the database type.
 */
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'ibm',
  password: '453644',
  database: 'infamily',
  entities: [User, Token],
  synchronize: true, // Set to false in production
  // logging: true,
});

/**
 * Initialize the data source and handle connection success or failure.
 */
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
