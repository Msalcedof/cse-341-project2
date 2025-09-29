const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book API',
      version: '1.0.0',
      description: 'API for managing books',
    },
  },
  apis: ['./routes/*.js'], // Path to your route files
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
