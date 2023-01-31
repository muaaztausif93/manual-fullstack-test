/* we need to initialize dot env before everything else */
/* eslint-disable @typescript-eslint/no-var-requires */
require('custom-env').env(true);
require('dotenv').config();

/* eslint-disable */
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import flash from 'express-flash';
import { Model } from 'objection';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { APP_CONFIG } from './config/appConfig';
import { Server as HttpServer } from 'http';
import knexConnection from '../knexConnection';
import { logger, loggerHttp } from './utils/logger';
import { createHttpTerminator } from 'http-terminator';
import { AppRoutes, noAuthRoutes } from './routes/routes';
import handleError, { handleErrorMiddleware } from './lib/errors/handleError';
/* eslint-enable */

class Server {
  private app: express.Application;
  private server: HttpServer | null;
  private port: number | null;

  constructor() {
    this.app = express(); // init the application
    this.port = Number(APP_CONFIG.get('ports').PORT);
    this.server = null;
    this.configuration();
    this.routes();
    this.errorHandling();
  }

  /**
   * Configure the server
   */
  public configuration() {
    process.on('unhandledRejection', (reason) => {
      throw reason;
    });

    process.on('uncaughtException', (error) => {
      logger.error('Handling uncaught exception...');
      handleError(error);
    });
    this.app.set('port', this.port);
    this.app.use(helmet());
    this.app.use(express.json({ limit: '1mb', type: 'application/json' }));
    this.app.use(
      express.raw({
        inflate: true,
        limit: '1mb',
        type: () => true, // this matches all content types
      }),
    );
    this.app.use(loggerHttp);
    this.app.use(morgan('dev'));
    this.app.use(cookieParser());
    this.app.use(
      session({
        secret: APP_CONFIG.get('secrets').SESSION_SECRET!,
        resave: true,
        saveUninitialized: true,
      }),
    );
    this.app.use(flash());
    this.app.use(cors());
    Model.knex(knexConnection[APP_CONFIG.get('env') || 'development']);
  }

  /**
   * Configure the routes
   */
  public async routes() {
    noAuthRoutes.forEach((route) => {
      this.app.use(`/api${route.path}`, route.middleware, route.action);
    });
    AppRoutes.forEach((route) => {
      this.app.use(`/api${route.path}`, route.middleware, route.action);
    });
  }

  public errorHandling() {
    this.app.use(handleErrorMiddleware);
  }

  public get address() {
    if (!this.server) return null;
    return this.server.address();
  }

  /**
   * start the server
   */
  public start() {
    this.server = this.app.listen(this.app.get('port'), () => {
      logger.info(`Server is listening ${this.app.get('port') || 'random'} port.`);
    });
  }

  public async stop() {
    const { server } = this;
    if (!server) return;
    const httpTerminator = createHttpTerminator({ server });
    await httpTerminator.terminate();
  }
}

const server = new Server();
server.start();

export default server;
