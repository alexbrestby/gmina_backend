import { DataSource } from 'typeorm';
import { User } from '../models/User';

export const AppDataSource = new DataSource({
  type: 'postgres', // или ваш тип базы данных
  host: 'localhost',
  port: 5432,
  username: 'ibm',
  password: '453644',
  database: 'infamily',
  entities: [User],
  synchronize: true,// установите false в продакшене
  logging: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

