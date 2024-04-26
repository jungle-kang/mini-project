import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomCreate } from './room-create/entities/room-create.entity';
import { RoomCreateModule } from './room-create/room-create.module';
import { ContentModule } from './content/content.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '54.180.124.141',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'mini',
      entities: [__dirname + '/../**/*.entity.{js, ts}', RoomCreate],
      synchronize: true,
    }),
    RoomCreateModule,
    ContentModule,
    RoomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
