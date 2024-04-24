import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config as dotenvConfig } from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenvConfig({ path: '.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', {
    exclude: ['/health'],
  });

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  const port = process.env.PORT;
  await app.listen(port);
  console.info(`Running on port ${port}`);
  console.info(
    `Documentation: http://localhost:${process.env.PORT}/documentation`,
  );
}
bootstrap();
