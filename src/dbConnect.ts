import { Sequelize } from 'sequelize';
import config from './configs/appConfig';

export const pgdb = new Sequelize(
  `postgres://${config.POSTGRES_USER}:${config.POSTGRES_PASSWORD}@${config.POSTGRES_URL}:${config.POSTGRES_DB}`,
  {
    logging: config.DEV === true
  }
); // Example for postgres

export default async () => {
  try {
    await pgdb.authenticate();
    // tslint:disable-next-line: no-console
    console.log('PSQL Connection has been established successfully.');
    await pgdb.sync({ alter: true });
    // tslint:disable-next-line: no-console
    console.log('All models were synchronized successfully.');
  } catch (error) {
    // tslint:disable-next-line: no-console
    console.error(error.message);
  }
};
