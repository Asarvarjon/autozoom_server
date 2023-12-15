import { Router } from 'express';
import protect from './../../modules/shared/middlewares/auth/protect';
import { Routes } from '../shared/interface/routes.interface';
import validate from '../shared/middlewares/validate';
import AuthController from './auth.controller';
import { SigninDTO, SignUpDTO, ResendOtpDTO, ConfirmOtpDTO } from './dto/auth.dto';

export default class AuthRoute implements Routes {
  public path = '/auth/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {  
    this.router.post(`${this.path}refreshToken`, this.authController.refreshToken);   
    this.router.post(`${this.path}signin`,validate(SigninDTO, 'body', true),this.authController.signIn);  
  }
}
