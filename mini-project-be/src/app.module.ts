import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
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
      entities: [__dirname + '/../**/*.entity.{js, ts}'],
      synchronize: true,
    }),
    ContentModule,
    RoomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
