import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface';
import rateLimit from 'express-rate-limit';
import * as express from 'express';
import * as path from 'path';
const PORT = process.env.PORT || '5000';
const helmet = require('helmet');
const engines = require('consolidate');
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    bodyParser: true,
  });
  app.engine('ejs', engines.ejs);
  app.set('views', path.join(__dirname, '../../view'));
  app.set('view engine', 'ejs');
  app.use('/asset', express.static('asset'));
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger/api', app, document);
  /* SECURITY */
  app.enable('trust proxy');
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    rateLimit({
      windowMs: 1 * 1000,
      max: 1000,
      message: 'too many requests! slow down',
    }),
  );
  await app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
bootstrap().catch(error => {
  console.error('Error during bootstrapping:', error);
});
