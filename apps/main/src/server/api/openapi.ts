import { generateOpenApiDocument } from 'trpc-openapi';
import { appRouter } from './root';

// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: 'Example CRUD API',
  description: 'OpenAPI compliant REST API built using tRPC with Next.js',
  version: '1.0.0',
  // main endpoint to make REST requests
  baseUrl: 'http://localhost:3005/api',
  tags: ['users'],
});
