import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { UserRoleType } from '@/interfaces/userRoleType.enum';

const permisssionMiddleware = (roles: UserRoleType[]) => (req: Request, res: Response, next: NextFunction) => {
  try {
    // get user role
    const role = req['role'];
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>', role);

    // check if user role is in roles
    if (roles.indexOf(role) !== -1) {
      next();
    } else {
      next(new HttpException(401, 'You are unauthorized !'));
    }
  } catch (error) {
    next(error);
  }
};

export default permisssionMiddleware;
