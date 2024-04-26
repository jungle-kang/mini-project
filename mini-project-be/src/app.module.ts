import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomCreate } from './room-create/entities/room-create.entity';
import { RoomCreateModule } from './room-create/room-create.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '54.180.124.141',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'mini',
      entities: [RoomCreate],
      synchronize: true,
    }),
    RoomCreateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
 })

export class AppModule {}
