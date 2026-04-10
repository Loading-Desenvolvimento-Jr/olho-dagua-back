import fastifySwagger   from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyCors      from '@fastify/cors';
import Fastify          from 'fastify'

import { env }    from './shared/env';
import { routes } from "./routes"; 

import fs         from 'fs';
import path       from 'path';

import { ErrorHandlerMiddleware } from './middlewares/errorHandler';

const app = Fastify({
  logger: true
});

app.setErrorHandler(ErrorHandlerMiddleware);

const favicon = fs.readFileSync(
  path.join(__dirname, '../assets/olho-dagua.svg')
)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title:       "Olho D'agua API",
      version:     '1.0.0',
      description: "Documentação da API do olho d'agua",
    },
    servers: [
      { 
        url:         'http://localhost:3000',
        description: 'Localhost server',
      },
      { 
        url:         'https://p3k19h7c-3000.brs.devtunnels.ms/',
        description: 'Port-Forwarding server',
      },
    ],
    tags: [
      {
        name:        'water-fountain',
        description: 'Rotas de sobre os bebedouros',
      }
    ],
  }
});

app.register(fastifySwaggerUi, {
  routePrefix: '/',
  theme: {
    title: "API Olho D'agua - Documentação - Swagger Ui",
    favicon: [
      {
        filename: 'olho-dagua.svg',
        rel: 'icon',
        type: 'image/svg+xml',
        sizes: 'any',
        content: favicon
      }
    ]
  },
});

app.register(fastifyCors, {
  origin:         env.CORS_ORIGIN,
  methods:        ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization'],
  credentials:    true,
  maxAge:         3600,
});

app.register(routes);

export { app };