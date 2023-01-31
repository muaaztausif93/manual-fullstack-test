import convict from 'convict';

export const APP_CONFIG = convict({
  env: {
    doc: 'The application environment.',
    format: ['development', 'production', 'test', 'staging', 'local'],
    default: 'development',
    env: 'NODE_ENV',
  },
  ports: {
    PORT: {
      doc: 'The server port to bind.',
      format: 'port',
      default: 8000,
      env: 'PORT',
    },
    CRON_PORT: {
      doc: 'The cron port to bind.',
      format: 'port',
      default: 8001,
      env: 'CRON_SERVER_PORT',
    },
  },
  database: {
    DB_HOST: {
      doc: 'Database host name/IP',
      format: '*',
      default: 'localhost',
      env: 'DB_HOST',
    },
    DB_NAME: {
      doc: 'Database name',
      format: String,
      default: 'merchflow',
      env: 'DB_NAME',
    },
    DB_PORT: {
      doc: 'Database port',
      default: '5432',
      env: 'DB_PORT',
    },
    DB_TYPE: {
      doc: 'Database type (which database to use)',
      format: String,
      default: 'postgres',
      env: 'DB_TYPE',
    },
    DB_USERNAME: {
      doc: 'Database username',
      default: 'postgres',
      env: 'DB_USERNAME',
    },
    DB_PASSWORD: {
      doc: 'Database password',
      format: String,
      default: 'test',
      env: 'DB_PASSWORD',
    },
    DB_SCHEMA: {
      doc: 'Database schema',
      format: String,
      default: 'public',
      env: 'DB_SCHEMA',
    }
  },
  secrets: {
    SESSION_SECRET: {
      doc: 'session secret',
      format: String,
      default: 'JQWERTY',
      env: 'SESSION_SECRET',
    },
  },
  aws_credentials: {
    AWS_REGION: {
      doc: 'AWS Region',
      format: String,
      default: '',
      env: 'AWS_REGION',
    },
    AWS_COGNITO_SECRET_HASH: {
      doc: 'AWS Cognito Secret Hash',
      format: String,
      default: '',
      env: 'AWS_COGNITO_SECRET_HASH',
    },
    AWS_COGNITO_CLIENT_ID: {
      doc: 'AWS Cognito Client ID',
      format: String,
      default: '',
      env: 'AWS_COGNITO_CLIENT_ID',
    },
    AWS_COGNITO_USER_POOL_ID: {
      doc: 'AWS Cognito User Pool ID',
      format: String,
      default: '',
      env: 'AWS_COGNITO_USER_POOL_ID',
    },
  },
}).validate({ allowed: 'strict' })