FROM node:24.13.1-alpine AS builder

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci

COPY . .

COPY assets ./dist/assets

RUN npx prisma generate

RUN npx tsc --project tsconfig.json

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/index.js"]
