
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';

import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import rateLimit from 'express-rate-limit';


const PORT = process.env.PORT || '5000';

const helmet = require('helmet');
const engines = require('consolidate');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    bodyParser: true,
  });

  app.engine('ejs', engines.ejs);
  app.set('views', __dirname + '../../view');
  app.set('view engine', 'ejs');
  app.use('/asset', express.static('asset'));
  /* SWAGGER */
  const options = new DocumentBuilder()
    .setTitle('Start')
    .setDescription('The Start API description')
    .setVersion('1.0')
    .addTag('Start')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  /*****/

  /* SECURITY */
  app.enable('trust proxy');
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe())
  app.use(
    rateLimit({
      windowMs: 1 * 1000,
      max: 1000,
      message: 'too many request! slow down',
    }),
  );

  /******/
  await app.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`);
  });
}
bootstrap();
