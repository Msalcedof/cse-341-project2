const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Books & Authors API',
      version: '1.0.0',
      description: 'API for managing books and authors with full CRUD operations',
    },
    components: {
      schemas: {
        Author: {
          type: 'object',
          required: ['name', 'birthYear'],
          properties: {
            name: {
              type: 'string',
              example: 'Gabriel García Márquez'
            },
            birthYear: {
              type: 'integer',
              example: 1927
            },
            nationality: {
              type: 'string',
              example: 'Colombian'
            }
          }
        },
        Book: {
          type: 'object',
          required: ['title', 'author'],
          properties: {
            title: {
              type: 'string',
              example: 'One Hundred Years of Solitude'
            },
            author: {
              type: 'string',
              example: 'Gabriel García Márquez'
            },
            publishedYear: {
              type: 'integer',
              example: 1967
            },
            genre: {
              type: 'string',
              example: 'Magical Realism'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js'], // Path to your route files
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
