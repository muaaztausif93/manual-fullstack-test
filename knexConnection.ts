/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/first */
require('custom-env').env(true);
require('dotenv').config();

import { knexSnakeCaseMappers } from 'objection';
import type { Knex } from 'knex';
import knex from 'knex';
import path from 'path';
import { APP_CONFIG } from './src/config/appConfig';

// Update with your config settings.
const knexConnection: { [key: string]: Knex<any, unknown[]> } = {
  development: knex({
    client: 'postgresql',
    connection: {
      host: APP_CONFIG.get('database').DB_HOST,
      port: Number(APP_CONFIG.get('database').DB_PORT),
      user: APP_CONFIG.get('database').DB_USERNAME,
      password: APP_CONFIG.get('database').DB_PASSWORD,
      database: APP_CONFIG.get('database').DB_NAME,
    },
    migrations: {
      directory: path.join(__dirname, '/src/migrations'),
    },
    ...knexSnakeCaseMappers({
      underscoreBetweenUppercaseLetters: true,
    }),
  }),
};

export default knexConnection;
