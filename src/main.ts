import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 9999;

  //Habilitando CORS
  app.enableCors({
    origin:'http://localhost:4200',
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeader:'Content-Type, Accept, Authorization',
    credencials:true
  });

  await app.listen(port);
}
bootstrap();
