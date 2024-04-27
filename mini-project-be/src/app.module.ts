import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentModule } from './content/content.module';
import { RoomModule } from './room/room.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '54.180.124.141',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'mini',
      entities: [__dirname + '/../**/*.entity.{js, ts}'],
      synchronize: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ContentModule,
    RoomModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule { }
