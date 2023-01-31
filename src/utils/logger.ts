import pino from 'pino';
import pinoHttp from 'pino-http';
import rTracer from 'cls-rtracer';

export const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
  options: {
    colorize: true,
  },
  mixin() {
    return { requestId: rTracer.id() }
  },
});

export const loggerHttp = pinoHttp();
