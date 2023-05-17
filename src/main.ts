import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AllExceptionsFilter } from '@/filters';
import * as morgan from 'morgan';
import { AccessKeyGuard } from './guards/access-key.guard';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
    }),
  );
  // filters
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  // access key guard
  app.useGlobalGuards(new AccessKeyGuard(app.get(ConfigService)));
  // logging
  app.use(morgan('dev'));
  // versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });
  // listening
  const port = process.env.PORT || 8000;
  await app.listen(port);
  console.log(`Server is listening on ${await app.getUrl()}`);
}
bootstrap();
