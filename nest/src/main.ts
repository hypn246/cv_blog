import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common'; // Optional: For request validation
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up global middleware, if necessary
  // app.useGlobalPipes(new ValidationPipe()); // Uncomment to enable validation

  // Configure global prefix for API routes (optional)
  // app.setGlobalPrefix('api');

  // Enable CORS if needed
  app.enableCors({
    origin: process.env.FRONTEND || 'http://localhost:3000', // Adjust this based on your frontend application
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,
  });

  // Optionally add a global logger
  const logger = new Logger('Bootstrap');
  await app.listen(process.env.PORT || 5000);
  logger.log(`Application is running on: http://localhost:${process.env.PORT || 5000}`);
}

bootstrap();
