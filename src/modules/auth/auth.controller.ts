import { NextFunction, Request, Response } from 'express';
import AuthService from './auth.service';  

import { SigninDTO, SignUpDTO, ConfirmOtpDTO , ResendOtpDTO} from './dto/auth.dto';
import requestIp from 'request-ip';
import { IRefreshToken, ISignin } from './interface/auth.interface';

class AuthController {
  public authService = new AuthService();   

 
  public refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: IRefreshToken = req.body;

      const accessToken = await this.authService
        .refreshToken(data.token);

      res.status(201).json({ success: true, data: { accessToken }, message: 'Access token was generated' });
    } catch (error) {
      next(error);
    }
  };
 
  public signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: SigninDTO = req.body;

      const remoteIp = requestIp.getClientIp(req);
      const device = req.headers['user-agent'];

      const data = await this.authService.signIn({ phone_number: userData.phone_number, password: userData.password }, device, remoteIp);  

        res.status(200).json({ success: true, data, message: `Login success` });
    } catch (error) {
      next(error);
    }
  };

   

  public jimijim = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
       const jim = await this.authService.jimijim()
       
        res.status(200).json({ success: true,  message: jim });
    } catch (error) {
      next(error);
    }
  };

  public getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req['user']
      

      res.status(200).json({ success: true, data: user, message: 'Current user' });
    } catch (error) {
      next(error);
    }
  };

}

export default AuthController;
