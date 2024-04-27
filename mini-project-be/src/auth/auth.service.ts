import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import QueryString from 'qs';

@Injectable()
export class authService {
    googleLogin(req) {
        if (!req.user) {
            return 'No user from google'
        }

        return {
            message: 'User information from google',
            user: req.user
        }
    }

}