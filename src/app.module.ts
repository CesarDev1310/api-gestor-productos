import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './productos/entities/producto.entity';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    //Config para DB
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService: ConfigService)=>({
        type:'postgres',
        host:configService.get<string>('DB_HOST'),
        port:configService.get<number>('DB_PORT'),
        username:configService.get<string>('DB_USER'),
        password:configService.get<string>('DB_PASSWORD'),
        database:configService.get<string>('DB_NAME'),
        autoLoadEntities:true,
        synchronize:true
      })
    }),

    //Fin config para DB
    AuthModule,
    TypeOrmModule.forFeature([Producto])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
