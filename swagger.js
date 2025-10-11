const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Books & Authors API',
      version: '1.0.0',
      description: `
        This API allows users to manage books and authors with full CRUD operations.
        Authentication is handled via Google OAuth. Users must log in to access protected routes such as creating, updating, or deleting books and authors.
        After logging in, a session is established and protected routes become accessible.
      `,
    },
    components: {
      securitySchemes: {
        OAuth2: {
          type: 'oauth2',
          flows: {
            authorizationCode: {
              authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
              tokenUrl: 'https://oauth2.googleapis.com/token',
              scopes: {
                'read:books': 'Read book data',
                'write:books': 'Modify book data',
                'read:authors': 'Read author data',
                'write:authors': 'Modify author data'
              }
            }
          }
        }
      },
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
    },
    security: [
      {
        OAuth2: []
      }
    ]
  },
  apis: ['./routes/*.js'], // Path to your route files
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
