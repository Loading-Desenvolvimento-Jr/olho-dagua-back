import fastifySwagger   from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import Fastify          from 'fastify'

import { routes } from "./routes"; 
import fs         from 'fs';
import path       from 'path';

const app = Fastify({
  logger: true
});

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
        description: 'Development server',
      }
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

app.register(routes);

export { app };