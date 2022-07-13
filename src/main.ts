import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CatsModule } from './cats/cats.module';

async function bootstrap() {
  // create NestJS application
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  // use global pipe validation
  await app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // create swagger options
  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0.0')
    .addTag('cats')
    .build();

  // create swagger document
  const swaggerDocument = SwaggerModule.createDocument(app, options, {
    include: [CatsModule],
  });

  // setup swagger module
  SwaggerModule.setup('swagger', app, swaggerDocument);

  // launch server
  await app.listen(3000, '0.0.0.0');
  Logger.log(`Application is running on: ${await app.getUrl()}`, 'bootstrap');
}
bootstrap();
