import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import { Token } from '../entity/Token';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'ibm',
  password: '453644',
  database: 'infamily',
  entities: [User, Token],
  synchronize: true,// установите false в продакшене
  // logging: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

