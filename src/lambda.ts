import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { configure } from '@vendia/serverless-express';

const expressApp = express();
const adapter = new ExpressAdapter(expressApp);
let configuredServer;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, adapter);
    app.enableCors();
    // app.setGlobalPrefix('media');
    await app.init();
    configuredServer = configure({ app: expressApp });
  } catch (error) {
    console.error('Error bootstrapping NestJS application:', error);
    throw error;
  }
}

bootstrap();

exports.handler = async (event, context) => {

  if (!configuredServer) {
    console.log('Server not configured. Bootstrapping...');
    await bootstrap();
  }

  return configuredServer(event, context);
};
