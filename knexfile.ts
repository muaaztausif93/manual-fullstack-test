/* eslint-disable */
require('custom-env').env(true);
require('dotenv').config();
import { knexSnakeCaseMappers } from 'objection';
import type { Knex } from 'knex';
import { APP_CONFIG } from './src/config/appConfig';

// Update with your config settings.
const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      host: APP_CONFIG.get('database').DB_HOST,
      port: Number(APP_CONFIG.get('database').DB_PORT),
      user: APP_CONFIG.get('database').DB_USERNAME,
      password: APP_CONFIG.get('database').DB_PASSWORD,
      database: APP_CONFIG.get('database').DB_NAME,
    },
    migrations: {
      directory: __dirname + '/src/migrations',
    },
    ...knexSnakeCaseMappers({
      underscoreBetweenUppercaseLetters: true,
    }),
  },
};

export default config;
