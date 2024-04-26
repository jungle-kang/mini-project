## Swagger 사용법

```
$> npm install --save @nestjs/swagger swagger-ui-express
```

### utils/swagger.ts 폴더/파일 생성
```ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app) {
    const config = new DocumentBuilder()
        .setTitle('Swagger API List')
        .setDescription('Swagger API description')
        .setVersion('1.0')
        .addTag('swagger')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}
```
### main.ts
setsupSwagger 추가
```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();

```
### controller, dto에 필요한 모듈 추가
```ts
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('rooms')
@Controller('rooms')
export class RoomController {
    constructor(private readonly roomService: RoomService) { }

    @Post('/')
    @ApiOperation({
        summary: '방 생성',
        description: '방 생성 API'
    }) // api 설명
```
```ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateContentDto {
    @ApiProperty({ description: 'content 내용' })
    @IsString()
    text: string;
}
```
### postman 처럼 사용가능
```ts
 @Patch('/:id/status')
    @ApiOperation({
        summary: 'ID로 특정 게시물의 상태 업데이트',
        description: 'default public -> private 로 변경가능 '
    })
    @ApiConsumes('application/x-www-form-urlencoded') // form 형식(postman 처럼)
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                status: {
                    type: 'string',
                    description: "private or public",
                    enum: ['private', 'public']
                },
            },
        },
    })
```
