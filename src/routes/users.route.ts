import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import permisssionMiddleware from '@/middlewares/permission.middleware';
import { UserRoleType } from '@/interfaces/userRoleType.enum';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      authMiddleware,
      permisssionMiddleware([UserRoleType.SUPER_ADMIN, UserRoleType.ADMIN, UserRoleType.EDITOR]),
      this.usersController.getUsers,
    );
    this.router.get(
      `${this.path}/:id`,
      authMiddleware,
      permisssionMiddleware([UserRoleType.SUPER_ADMIN, UserRoleType.ADMIN, UserRoleType.EDITOR]),
      this.usersController.getUserById,
    );
    this.router.post(
      `${this.path}`,
      authMiddleware,
      permisssionMiddleware([UserRoleType.SUPER_ADMIN, UserRoleType.ADMIN]),
      validationMiddleware(CreateUserDto, 'body'),
      this.usersController.createUser,
    );
    this.router.put(
      `${this.path}/:id`,
      authMiddleware,
      permisssionMiddleware([UserRoleType.SUPER_ADMIN, UserRoleType.ADMIN]),
      validationMiddleware(CreateUserDto, 'body', true),
      this.usersController.updateUser,
    );
    this.router.delete(
      `${this.path}/:id`,
      authMiddleware,
      permisssionMiddleware([UserRoleType.SUPER_ADMIN, UserRoleType.ADMIN]),
      this.usersController.deleteUser,
    );
  }
}

export default UsersRoute;
