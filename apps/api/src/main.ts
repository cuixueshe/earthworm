import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { appBindGlobal } from './app/useGlobal';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      /^http:\/\/localhost(:\d+)?$/,
      /^http:\/\/earthworm\.cuixueshe\.com(:81)?$/,
    ],
  });

  appBindGlobal(app);
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}

bootstrap();
