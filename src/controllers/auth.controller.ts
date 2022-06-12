import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import { loginDto } from '@/dtos/login.dto';

class AuthController {
  public authService = new AuthService();
  
  // not required according to project specs
  // public signUp = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const userData: CreateUserDto = req.body;
  //     const signUpUserData: User = await this.authService.signup(userData);
  //     res
  //       .status(201)
  //       .json({ user: [{name: signUpUserData.name, email: signUpUserData.email, role: signUpUserData.role, status: signUpUserData.status}], message: 'user signup successful !' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: loginDto = req.body;
      const { token } = await this.authService.login(userData);

      res.status(200).json({ token, status: 'logged in successfully !' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ user: [{email : logOutUserData.email, name: logOutUserData.name}], message: 'logout success.' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
