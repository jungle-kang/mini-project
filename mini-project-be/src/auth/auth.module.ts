import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
// import { KakaoStrategy } from './kakao.strategy';
import { GoogleStrategy } from './google.strategies';
import { AuthController } from './auth.controller';
import { authService } from './auth.service';


@Module({
    imports: [PassportModule],
    providers: [GoogleStrategy, authService],
    exports: [authService],
    controllers: [AuthController],
})
export class AuthModule { }
