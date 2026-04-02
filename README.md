<div align="center">

# Olho d'Água - Backend

<img src="./assets/olho-dagua.svg" alt="Olho d'Água Logo" width="200"/>

### Monitoramento da qualidade de água dos Bebeduros da UFC Sobral

<!-- Espaço reservado para badges -->

![Static Badge](https://img.shields.io/badge/Loading%20Jr-%236d2779?style=for-the-badge&link=https%3A%2F%2Floadingjr.com.br%2F)

![Static Badge](<https://img.shields.io/badge/Universidade%20Federal%20Do%20Cear%C3%A1%20(UFC)%20Sobral%20-%20%23008F36?style=for-the-badge&link=https%3A%2F%2Fsobral.ufc.br%2F>)

</div>

---

## 📋 Sobre o Projeto

### O Problema

A qualidade da água consumida nos bebedouros da Universidade Federal do Ceará - Campus Sobral é uma preocupação constante para a comunidade acadêmica. Atualmente, não existe um sistema eficiente de monitoramento que permita:

- Acompanhar a qualidade da água em tempo real
- Identificar quando os filtros precisam ser trocados
- Monitorar o consumo e temperatura da água
- Notificar a manutenção sobre problemas nos bebedouros

### A Solução

O **Olho d'Água** é um sistema completo de monitoramento da qualidade de água dos bebedouros, composto por três componentes integrados:

1. **Sistema Embarcado (IoT)**: Dispositivos instalados nos bebedouros que coletam dados de temperatura, consumo e status dos filtros em tempo real
2. **Backend (Este Repositório)**: API REST e sistema de processamento de dados via MQTT que gerencia e armazena todas as informações coletadas
3. **Frontend Web**: Interface visual para visualização dos dados, alertas e gerenciamento dos bebedouros

Este repositório contém especificamente o **backend** da solução, responsável por receber, processar e disponibilizar os dados através de uma API REST documentada.

---

## 🚀 Sobre este Projeto

Este é o backend do sistema Olho d'Água, desenvolvido com Node.js e TypeScript. O projeto utiliza uma arquitetura robusta baseada em:

- **API REST** com Fastify para alta performance
- **Broker MQTT** (Mosquitto) para comunicação em tempo real com os dispositivos IoT
- **Worker MQTT** dedicado para processamento assíncrono de mensagens
- **PostgreSQL** como banco de dados relacional
- **Prisma ORM** para gerenciamento do banco de dados
- **Padrão Repository** para abstração da camada de dados
- **Docker** para containerização e facilidade de deploy

---

## 📦 Instalação e Configuração

### Pré-requisitos

- Node.js >= 20.0.0
- npm ou yarn
- Docker e Docker Compose (opcional, mas recomendado)
- PostgreSQL (se não usar Docker)

### 1. Clonar o Repositório

```bash
git clone https://github.com/Loading-Desenvolvimento-Jr/olho-dagua-back.git
cd olho-dagua-back
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e configure as variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Application
NODE_ENV=development
APP_PORT=3000
APP_HOST=0.0.0.0
CORS_ORIGIN=*

# Database (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=olho_dagua

# Prisma connection string
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/olho_dagua

# Mosquitto (MQTT Broker)
MQTT_BROKER_URL=mqtt://localhost:1883
MQTT_USER=admin
MQTT_PASSWORD=senhasegura321

# MQTT Topics
MQTT_TOPIC_PREFIX=system/fountains
MQTT_SUBSCRIBER_METRICS=/+/metric/+
MQTT_SUBSCRIBER_STATUS=/+/status
```

> 💡 **Nota**: Se você usar Docker Compose, as configurações do `.env.example` já estão otimizadas para funcionar com os containers.

### 4. Configurar o Banco de Dados

Execute as migrations do Prisma:

```bash
npx prisma migrate dev
```

Para gerar o Prisma Client:

```bash
npx prisma generate
```

---

## 🎯 Como Rodar

### Modo Desenvolvimento (Local)

Para rodar a aplicação localmente, você precisa iniciar **dois processos** separadamente:

#### 1. Rodar a API REST

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`

#### 2. Rodar o Worker MQTT

Em outro terminal, execute:

```bash
npx tsx watch src/mosquitto/subscriber.ts
```

Esse worker é responsável por:

- Conectar-se ao broker MQTT
- Escutar mensagens dos dispositivos IoT
- Processar e armazenar dados no banco de dados

> ⚠️ **Importante**: O worker MQTT precisa estar rodando separadamente da API para processar mensagens dos dispositivos. O Dockerfile usa o comando `npm run dev` por padrão, que inicia apenas a API.

---

## 🐳 Como Rodar com Docker

A maneira mais fácil de rodar toda a stack é usando Docker Compose:

```bash
docker-compose up -d
```

Isso irá iniciar **4 containers**:

1. **olho_dagua_api** (porta 3000): API REST Fastify
2. **olho_dagua_worker**: Worker MQTT para processamento de mensagens
3. **olho_dagua_db** (porta 5432): PostgreSQL
4. **olho_dagua_broker** (porta 1883): Mosquitto MQTT Broker

Para verificar os logs:

```bash
# Ver logs de todos os containers
docker-compose logs -f

# Ver logs apenas da API
docker-compose logs -f api

# Ver logs apenas do Worker MQTT
docker-compose logs -f mqtt-worker
```

Para parar os containers:

```bash
docker-compose down
```

Para parar e remover volumes (incluindo dados do banco):

```bash
docker-compose down -v
```

---

## 🛠️ Tech Stack

### Core

- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado de JavaScript
- **[Fastify](https://www.fastify.io/)** - Framework web de alta performance

### Banco de Dados

- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[Prisma](https://www.prisma.io/)** - ORM moderno para Node.js

### Comunicação IoT

- **[MQTT.js](https://github.com/mqttjs/MQTT.js)** - Cliente MQTT para Node.js
- **[Eclipse Mosquitto](https://mosquitto.org/)** - Broker MQTT

### Documentação

- **[@fastify/swagger](https://github.com/fastify/fastify-swagger)** - Geração de documentação OpenAPI
- **[@fastify/swagger-ui](https://github.com/fastify/fastify-swagger-ui)** - Interface Swagger UI

### Validação

- **[Zod](https://zod.dev/)** - Validação e parsing de schemas TypeScript-first

### DevOps

- **[Docker](https://www.docker.com/)** - Containerização
- **[Docker Compose](https://docs.docker.com/compose/)** - Orquestração de containers

### Desenvolvimento

- **[tsx](https://github.com/esbuild-kit/tsx)** - TypeScript execution e watch mode
- **[Vitest](https://vitest.dev/)** - Framework de testes unitários

---

## ⚡ Funcionalidades

### API REST

- ✅ **Listar Bebedouros**: Consultar todos os bebedouros cadastrados com suas informações
- ✅ **Status do Filtro**: Monitorar o estado dos filtros (EXCELLENT, GOOD, ATTENTION, TO_REPLACE)
- ✅ **Histórico de Temperatura**: Acompanhar o histórico de temperatura da água
- ✅ **Histórico de Consumo**: Visualizar dados de consumo de água ao longo do tempo
- ✅ **Registros de Troca de Filtro**: Histórico de manutenções realizadas

### Sistema MQTT

- ✅ **Recebimento de Métricas em Tempo Real**:
  - Temperatura da água
  - Volume consumido
- ✅ **Recebimento de Status dos Dispositivos**
- ✅ **Validação de Payloads** com Zod
- ✅ **Processamento Assíncrono** via worker dedicado
- ✅ **Estrutura de Tópicos Organizada**:
  ```
  system/fountains/{fountainId}/metric/{metricType}
  system/fountains/{fountainId}/status
  ```

### Documentação Interativa

- ✅ **Swagger UI** disponível em `http://localhost:3000/`
- ✅ **Documentação OpenAPI 3.0** completa
- ✅ **Testes de API** direto pela interface Swagger

---

## 🏗️ Arquitetura da Aplicação

### Estrutura de Diretórios

```
src/
├── app.ts                      # Configuração principal do Fastify
├── index.ts                    # Entry point da aplicação
├── controllers/                # Controllers da API REST
│   └── WaterFountainController.ts
├── services/                   # Lógica de negócio
│   ├── WaterFountainService.ts
│   ├── TemperatureService.ts
│   ├── ConsumptionService.ts
│   └── FilterChangeService.ts
├── repositories/               # Camada de acesso a dados
│   ├── interfaces/             # Contratos dos repositories
│   ├── prisma/                 # Implementações com Prisma
│   └── inMemory/               # Implementações para testes
├── routes/                     # Definição de rotas
│   ├── index.ts
│   └── waterFountainRoutes.ts
├── mosquitto/                  # Sistema MQTT
│   ├── subscriber.ts           # Worker MQTT (entry point)
│   ├── handlers.ts             # Handlers de mensagens MQTT
│   └── mqtt-types.ts           # Tipos e schemas Zod
├── middlewares/                # Middlewares do Fastify
│   └── errorHandler.ts
└── shared/                     # Utilitários compartilhados
    └── env.ts                  # Validação de variáveis de ambiente
```

### Fluxo de Dados

```
┌─────────────────┐
│  Dispositivo    │
│  IoT (ESP32)    │
└────────┬────────┘
         │
         │ MQTT Publish
         │
         ▼
┌─────────────────┐
│    Mosquitto    │
│  (MQTT Broker)  │
└────────┬────────┘
         │
         │ MQTT Subscribe
         │
         ▼
┌─────────────────┐
│  MQTT Worker    │  ◄── npx tsx watch src/mosquitto/subscriber.ts
│ (subscriber.ts) │
└────────┬────────┘
         │
         │ Recebe e valida dados
         │
         ▼
┌─────────────────┐
│  MQTT Handlers  │
│  (handlers.ts)  │
└────────┬────────┘
         │
         │ Interface com os serviços
         │
         ▼
┌─────────────────┐
│    Services     │
│   (Lógica de    │
│    negócio)     │
└────────┬────────┘
         │
         │
         ▼
┌─────────────────┐
│  Repositories   │
│  (Prisma ORM)   │
└────────┬────────┘
         │
         │
         ▼
┌─────────────────┐
│   PostgreSQL    │
│   (Database)    │
└─────────────────┘
         ▲
         │
         │ Consulta via API
         │
┌─────────────────┐
│   API REST      │  ◄── npm run dev
│   (Fastify)     │
└────────┬────────┘
         │
         │
         ▼
┌─────────────────┐
│   Frontend      │
│   (Cliente)     │
└─────────────────┘
```

### Padrões Arquiteturais

- **Repository Pattern**: Abstração da camada de dados, facilitando testes e mudanças de ORM
- **Service Layer**: Lógica de negócio concentrada nos services
- **Dependency Injection**: Injeção manual de dependências para melhor testabilidade
- **Schema Validation**: Validação de dados com Zod tanto na API quanto no MQTT
- **Worker Pattern**: Processamento assíncrono de mensagens MQTT em processo separado

### Modelo de Dados

```prisma
WaterFountain (Bebedouro)
├── id: UUID
├── name: String
├── location: String
├── temperature: Float
├── filterStatus: Enum (EXCELLENT, GOOD, ATTENTION, TO_REPLACE)
├── createdAt: DateTime
├── updatedAt: DateTime
├── Relations:
│   ├── waterConsumptions[]  (1:N)
│   ├── waterTemperatures[]  (1:N)
│   └── filterChanges[]      (1:N)

WaterConsumption (Consumo)
├── id: UUID
├── volume: Float
├── waterFountainId: UUID (FK)
├── createdAt: DateTime
└── updatedAt: DateTime

WaterTemperature (Temperatura)
├── id: UUID
├── temperature: Float
├── waterFountainId: UUID (FK)
├── createdAt: DateTime
└── updatedAt: DateTime

FilterChange (Troca de Filtro)
├── id: UUID
├── waterFountainId: UUID (FK)
├── createdAt: DateTime
└── updatedAt: DateTime
```

---

## 📝 Documentação da API

A documentação completa da API está disponível via Swagger UI:

- **URL**: `http://localhost:3000/`
- **Formato**: OpenAPI 3.0

### Principais Endpoints

#### Bebedouros

```http
GET /water-fountains
```

Lista todos os bebedouros cadastrados com suas informações completas.

---

## 🧪 Testes

Para rodar os testes:

```bash
npm test
```

---

## 🤝 Créditos

Este projeto foi desenvolvido pela **Loading Desenvolvimento Jr.** - Empresa Júnior do Curso de Engenharia de Computação da UFC Sobral.

### Equipe de Desenvolvimento

- **Embedded**: [Miguel Edson](https://github.com/Miguel-Edson), [Pablo Hugo](https://github.com/pab-h)
- **Frontend & Design**: [Miguel Edson](https://github.com/Miguel-Edson)
- **Mobile**: _Em breve **...**_
- **Backend & IoT**: [Cizé Lucas](https://github.com/CizeLucas), [Pablo Hugo](https://github.com/pab-h)
- **Gerência de Projetos**: [Cizé Lucas](https://github.com/CizeLucas)

### Agradecimentos

- Universidade Federal do Ceará - Campus Sobral

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

## 📞 Contato

- **Loading Jr.**: [Site](https://loadingjr.com.br) | [Instagram](https://instagram.com/loadingjr)
- **Email**: oi.loadingjr@gmail.com
- **Issues**: [GitHub Issues](https://github.com/Loading-Desenvolvimento-Jr/olho-dagua-back/issues)

---

<div align="center">

Desenvolvido com ❤️ pela **Loading Desenvolvimento Jr.**

</div>
