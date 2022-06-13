import { hash } from 'bcryptjs';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { SuperAdminSignup, User } from '@interfaces/users.interface';
import { userModel } from '@models/users.model';
import { isEmpty } from '@utils/util';
import { UserResponse } from './UserResponse';
import { UserResponseList } from './UserResponseList';

class UserService implements SuperAdminSignup {
  public users = userModel;

  public async findAllUser(): Promise<UserResponseList> {
    const users: User[] = await this.users.find();

    return new UserResponseList(users);
  }

  public async findUserById(userId: string): Promise<UserResponse> {
    if (isEmpty(userId)) throw new HttpException(400, 'Please fill up all required fields');

    const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, 'User does not exist !');

    return new UserResponse(findUser);
  }

  // Also used to add SUPER_ADMIN upon app initialization
  public async createUser(userData: CreateUserDto): Promise<UserResponse> {
    if (isEmpty(userData)) throw new HttpException(400, 'Please fill up all required fields');

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `Your email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return new UserResponse(createUserData);
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<UserResponse> {
    if (isEmpty(userData)) throw new HttpException(400, 'Please fill up all required fields');

    if (userData.email) {
      const findUser: User = await this.users.findOne({ email: userData.email });
      if (findUser && findUser._id != userId) throw new HttpException(409, `Your email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById: User = await this.users.findByIdAndUpdate(userId, { ...userData });
    if (!updateUserById) throw new HttpException(409, 'Update User Failed !');

    const updatedUser: User = await this.users.findOne({ _id: userId });

    return new UserResponse(updatedUser);
  }

  public async deleteUser(userId: string): Promise<UserResponse> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, 'Failed to delete user !');

    return new UserResponse(deleteUserById);
  }
}

export default UserService;
