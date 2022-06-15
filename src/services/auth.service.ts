import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { userModel } from '@models/users.model';
import { isEmpty } from '@utils/util';
import { loginDto } from '@/dtos/login.dto';

class AuthService {
  public users = userModel;


  // public async signup(userData: CreateUserDto): Promise<User> {
  //   if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

  //   const findUser: User = await this.users.findOne({ email: userData.email });
  //   if (findUser) throw new HttpException(409, `Your email: ${userData.email} already exists`);

  //   const hashedPassword = await hash(userData.password, 10);
  //   const createdUserData: User = await this.users.create({ ...userData, password: hashedPassword });

  //   return createdUserData;
  // }

  public async login(userData: loginDto): Promise<{ token: string }> {
    if (isEmpty(userData)) throw new HttpException(400, 'Please provide your login credentials !');

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `Your email: ${userData.email} was not found.`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Your password is not matching.');

    const tokenData = this.createToken(findUser);

    return { token: tokenData.token };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60000 * 60000;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }
}

export default AuthService;
