# web-crawler-project

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
<a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
<a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

<!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
[![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install

# watch mode
$ npm run start:dev

Web Crawler Project Documentation
Overview
The Web Crawler Project is designed to scrape product URLs from websites, process the extracted data, and expose the results through RESTful APIs. The project is developed using NestJS, leveraging its modular structure for scalability and maintainability.
File Structure
The project follows a modular and organized structure:

Web-Crawler-Project/
├── dist/                  # Compiled JavaScript files
├── node_modules/          # Third-party dependencies
├── src/                   # Application source code
│   ├── app.module.ts      # Root application module
│   ├── config/            # App and environment configurations
│   ├── database/          # Database configurations
│   ├── crawlers/          # Crawling logic modules
│   ├──   controllers/       # Crawling controllers
│   ├──   services/          # Crawling services
│   ├──   module/          # Crawling Module
│   ├──   dto/          # Crawling Data Transfer Objects for input validation
│   ├──   domain/          # Crawling Domain
│   ├──   infrastructure/          # Database related logic
│   ├──     entities/          # Schema defined
│   ├──     mappers/          # Map schema with domain
│   ├──     repositories/          # Do database logic
├── test/                  # End-to-end tests
├── .env                   # Environment variables
├── .env.example           # Example environment configuration
├── package.json           # Dependency and script manager
├── tsconfig.json          # TypeScript configuration
└── tsconfig.build.json    # TypeScript build configuration




Module Contents
Entities
Entities represent the database models used in the application. These are typically mapped directly to MongoDB collections using Mongoose.

Mappers
Mappers handle data transformations. They convert raw web-scraped data into structured models suitable for internal processing.

DTOs (Data Transfer Objects)
DTOs are used for:
- Input validation: Ensures API requests conform to expected formats.
- Output typing: Ensures consistent response structures.

Repositories
Repositories abstract database interactions. By encapsulating data-access logic, they enable clean separation of concerns.

Controllers
Controllers are entry points for handling HTTP requests. They:
- Accept and validate user input.
- Delegate processing to services.
- Return responses to the client.

Services
Services implement the business logic of the application. They orchestrate repository interactions and any additional computations.

App Configuration
App-wide configurations are handled in src/config/app.config.ts.

Database Configuration
Database connectivity is managed through src/database/config/database.config.ts and MongooseConfigService.


Key Feature: discoverProductUrls
The `discoverProductUrls` method crawls product pages to extract and return URLs.
Purpose
The `discoverProductUrls` method crawls product pages to extract and return URLs.

Workflow

1. Makes an HTTP GET request to the target website.
2. Parses the HTML response using Cheerio.
3. Extracts product links based on CSS selectors.
4. Returns a structured array of URLs.

API Documentation
Swagger Integration
Swagger is configured to provide an interactive API documentation platform.

Setup:

const config = new DocumentBuilder()
  .setTitle('Web Crawler API')
  .setDescription('API documentation for the web crawler')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

How to Run
	1.	Install dependencies: npm install
	2.	Set up environment variables (.env).
	3.	Start the application: npm run start:dev
	4.	Access Swagger docs at: http://localhost:3000/docs#



Dummy Request Example : 

curl -X 'POST' \
  'http://localhost:3000/v1/crawler/discover' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '[
  "amazon.com", "myntra.com", "flipkart.com", "adidas.co.in"

]'
Dummy Response Example : 
