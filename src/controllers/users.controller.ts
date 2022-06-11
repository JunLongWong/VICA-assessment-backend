import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import userService from '@services/users.service';
import { UserResponse } from '@/services/UserResponse';
import { UserResponseList } from '@/services/UserResponseList';

class UsersController {
  public userService = new userService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: UserResponseList = await this.userService.findAllUser();
      res.status(200).json({ users: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: UserResponse = await this.userService.findUserById(userId);
      res.status(200).json({ user: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: UserResponse = await this.userService.createUser(userData);

      res.status(201).json({ user: createUserData, message: 'user created successfully!' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: CreateUserDto = req.body;
      const updateUserData: UserResponse = await this.userService.updateUser(userId, userData);

      res.status(200).json({ user: updateUserData, message: 'user updated successfully!' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: UserResponse = await this.userService.deleteUser(userId);

      res.status(200).json({ user: deleteUserData, message: 'user deleted successfully!' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
