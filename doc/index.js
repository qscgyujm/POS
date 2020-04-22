import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'POS - API', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'POS - api doc',
  },
};

const options = {
  swaggerDefinition,
  apis: ['./doc/api/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = process.env.PORT || 7777;

app.listen(port, () => {
  console.log(`Api listening on port: localhost:${port}`);
});
